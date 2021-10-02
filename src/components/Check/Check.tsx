import {
  InputKeyBoardEventType,
  InputRefType,
  ItemNew,
} from "../../interfaces/interface";
import Description from "../Description/Description";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import "./Check.scss";

function Check({
  item,
  index,
  cursor,
  handleRadioPress,
  handleToggleCheck,
}: {
  item: ItemNew;
  index: number;
  cursor: number;
  handleRadioPress: (
    e: InputKeyBoardEventType,
    inputYesRef: InputRefType,
    inputNoRed: InputRefType,
    id: string
  ) => void;
  handleToggleCheck: (id: string, value: string) => void;
}) {
  return (
    <li
      className={`check ${!item.enabled && index !== 0 ? "disabled" : ""} ${
        index === cursor && item.enabled ? "active" : ""
      }`}
    >
      <Description description={item.description} />
      <ToggleSwitch
        id={item.id}
        handleRadioPress={handleRadioPress}
        handleToggleCheck={handleToggleCheck}
      />
    </li>
  );
}

export default Check;
