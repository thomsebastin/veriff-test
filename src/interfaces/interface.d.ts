interface Item {
  id: string;
  priority: number;
  description: string;
}

interface ItemNew extends Item {
  checked: boolean | undefined;
  enabled: boolean;
}

type InputKeyBoardEventType = React.KeyboardEvent<HTMLInputElement>;
type InputRefType = React.RefObject<HTMLInputElement>;
type UListRefType = React.KeyboardEvent<HTMLUListElement>;

type handleRadioPressType = (
  e: InputKeyBoardEventType,
  inputYesRef: InputRefType,
  inputNoRed: InputRefType,
  id: string
) => void;

type handleToggleCheckType = (id: string, value: string) => void

export {
  Item,
  ItemNew,
  handleRadioPressType,
  handleToggleCheckType,
  InputRefType,
  InputKeyBoardEventType,
  UListRefType,
}

