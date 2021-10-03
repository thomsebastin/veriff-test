import { ItemNew } from "../interfaces/interface";

const isAllChecked = (items: ItemNew[]): boolean => {
  return items.every((item: ItemNew) => {
    return item.checked === true;
  });
};

const isOneUnchecked = (items: ItemNew[]): boolean => {
  return items.some((item: ItemNew) => {
    return item.checked === false;
  });
};

const isSubmitEnabled = (items: ItemNew[]): boolean => {
  return isAllChecked(items) || isOneUnchecked(items);
};

const getIndex = (items: ItemNew[], id: string): number => {
  return items.findIndex((item: ItemNew) => {
    return item.id === id;
  });
};

export {
  isSubmitEnabled,
  getIndex,
}
