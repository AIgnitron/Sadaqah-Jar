import * as SQLite from "expo-sqlite";
import { ideas } from "../data/ideas";
import { Entry, Idea } from "../types";

const db = SQLite.openDatabase("sadaqah.db");

type SqlParams = (string | number | null)[];

const executeSql = (sql: string, params: SqlParams = []) =>
  new Promise<SQLite.SQLResultSet>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        params,
        (_, result) => resolve(result),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

export const initDb = async () => {
  await executeSql(
    "CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, amount REAL NOT NULL, note TEXT, createdAt TEXT NOT NULL);"
  );
  await executeSql(
    "CREATE TABLE IF NOT EXISTS ideas (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT NOT NULL, category TEXT NOT NULL);"
  );
};

export const seedDb = async () => {
  const result = await executeSql("SELECT COUNT(*) as count FROM ideas;");
  const count = result.rows.item(0).count as number;

  if (count === 0) {
    for (const idea of ideas) {
      await executeSql(
        "INSERT INTO ideas (title, description, category) VALUES (?, ?, ?);",
        [idea.title, idea.description, idea.category]
      );
    }
  }
};

export const addEntry = async (amount: number, note: string) => {
  const createdAt = new Date().toISOString();
  await executeSql(
    "INSERT INTO entries (amount, note, createdAt) VALUES (?, ?, ?);",
    [amount, note, createdAt]
  );
};

export const getEntries = async (): Promise<Entry[]> => {
  const result = await executeSql(
    "SELECT id, amount, note, createdAt FROM entries ORDER BY datetime(createdAt) DESC;"
  );
  return result.rows._array as Entry[];
};

export const getTotalAmount = async () => {
  const result = await executeSql("SELECT SUM(amount) as total FROM entries;");
  return (result.rows.item(0).total as number | null) ?? 0;
};

export const getWeeklySummary = async () => {
  const start = new Date();
  start.setDate(start.getDate() - 7);
  const result = await executeSql(
    "SELECT SUM(amount) as total, COUNT(*) as count FROM entries WHERE datetime(createdAt) >= datetime(?);",
    [start.toISOString()]
  );
  const row = result.rows.item(0) as { total: number | null; count: number };
  return {
    total: row.total ?? 0,
    count: row.count,
  };
};

export const getIdeas = async (): Promise<Idea[]> => {
  const result = await executeSql(
    "SELECT id, title, description, category FROM ideas ORDER BY id ASC;"
  );
  return result.rows._array as Idea[];
};
