import Description from "../Description/Description";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import "./Check.scss";

function Check({
  item,
  index,
  handleToggleCheck,
}: {
  item: any;
  index: number;
  handleToggleCheck: any;
}) {
  return (
    <li className={`check ${!item.enabled && index !== 0 ? "disabled" : ""}`}>
      <Description description={item.description} />
      <ToggleSwitch
        id={item.id}
        handleToggleCheck={handleToggleCheck}
      />
    </li>
  );
}

export default Check;
