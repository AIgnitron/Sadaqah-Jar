import { Idea } from "../types";

export const ideas: Omit<Idea, "id">[] = [
  {
    title: "Support a local food pantry",
    description: "Donate shelf-stable groceries or funds to help families in need.",
    category: "Community",
  },
  {
    title: "Sponsor an iftar meal",
    description: "Provide meals for fasting neighbors during Ramadan.",
    category: "Faith",
  },
  {
    title: "Give school supplies",
    description: "Backpack and stationery donations help students start strong.",
    category: "Education",
  },
  {
    title: "Support emergency relief",
    description: "Contribute to organizations responding to crises and disasters.",
    category: "Relief",
  },
  {
    title: "Plant a tree",
    description: "Offset carbon and beautify neighborhoods with tree planting.",
    category: "Environment",
  },
  {
    title: "Help a neighbor with groceries",
    description: "Offer a grocery gift card or pay for essentials for someone nearby.",
    category: "Community",
  },
];
