import { useRef } from "react";
import "./ToggleSwitch.scss";

function ToggleSwitch({
  id,
  handleRadioPress,
  handleToggleCheck,
}: {
  id: string;
  handleRadioPress: any;
  handleToggleCheck: any;
}) {
  const inputYesRef = useRef<HTMLInputElement>(null);
  const inputNoRef = useRef<HTMLInputElement>(null);
  // const toggleSwitchRef = useRef<HTMLDivElement>(null);

  return (
    <div className="toggle-switch">
      <input
        type="radio"
        id={`radio-yes-${id}`}
        name={`switch-${id}`}
        value="yes"
        ref={inputYesRef}
        onKeyDown={(e) => handleRadioPress(e, inputYesRef, inputNoRef, id)}
        onChange={() => handleToggleCheck(id, "yes")}
      />
      <label htmlFor={`radio-yes-${id}`}>Yes</label>
      <input
        type="radio"
        id={`radio-no-${id}`}
        name={`switch-${id}`}
        value="no"
        ref={inputNoRef}
        onKeyDown={(e) => handleRadioPress(e, inputYesRef, inputNoRef, id)}
        onChange={() => handleToggleCheck(id, "no")}
      />
      <label htmlFor={`radio-no-${id}`}>No</label>
    </div>
  );
}

export default ToggleSwitch;
