import { Item, ItemNew } from "../../interfaces/interface";

export function fetchChecks(): Promise<Item[]> {
  return new Promise((resolve, _reject) =>
    resolve([
      {
        id: "aaa",
        priority: 10,
        description: "Face on the picture matches face on the document",
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
        id: "ddd",
        priority: 3,
        description: "Document data is clearly visible",
      },
    ])
  );
}

export function submitCheckResults(results: ItemNew[]): Promise<ItemNew[]> {
  return new Promise((resolve, _reject) =>
    resolve(results)
  );
}
