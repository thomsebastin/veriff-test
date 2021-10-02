import { Item, ItemNew } from "../../interfaces/interface";

export const sortResponse = (items: Item[]): Item[] => {
  return items.sort((a: any, b: any) => a.priority - b.priority);
};

export const updateResponse = (items: Item[]): ItemNew[] => {
  return sortResponse(items).map((item: any, index: number) => {
    return {
      ...item,
      enabled: index === 0,
      checked: undefined,
    };
  });
};

export const sortedChecks = [
  {
    id: "ddd",
    priority: 3,
    description: "Document data is clearly visible",
  },
  {
    id: "bbb",
    priority: 5,
    description: "Veriff supports presented document",
  },
  {
    id: "ccc",
    priority: 7,
    description: "Face is clearly visible",
  },
  {
    id: "aaa",
    priority: 10,
    description: "Face on the picture matches face on the document",
  },
];

export const updatedChecks = [
  {
    id: "ddd",
    priority: 3,
    description: "Document data is clearly visible",
    enabled: true,
    checked: undefined,
  },
  {
    id: "bbb",
    priority: 5,
    description: "Veriff supports presented document",
    enabled: false,
    checked: undefined,
  },
  {
    id: "ccc",
    priority: 7,
    description: "Face is clearly visible",
    enabled: false,
    checked: undefined,
  },
  {
    id: "aaa",
    priority: 10,
    description: "Face on the picture matches face on the document",
    enabled: false,
    checked: undefined,
  },
];
