import { useRef } from "react";
import { Checked } from "../../constants/constants";
import {
  handleRadioPressType,
  handleToggleCheckType,
} from "../../interfaces/interface";

import "./ToggleSwitch.scss";

function ToggleSwitch({
  id,
  handleRadioPress,
  handleToggleCheck,
}: {
  id: string;
  handleRadioPress: handleRadioPressType;
  handleToggleCheck: handleToggleCheckType;
}) {
  const inputYesRef = useRef<HTMLInputElement>(null);
  const inputNoRef = useRef<HTMLInputElement>(null);

  return (
    <div className="toggle-switch">
      <input
        type="radio"
        id={`radio-yes-${id}`}
        name={`switch-${id}`}
        value={Checked.Yes}
        ref={inputYesRef}
        onKeyDown={(e) => handleRadioPress(e, inputYesRef, inputNoRef, id)}
        onChange={() => handleToggleCheck(id, Checked.Yes)}
      />
      <label htmlFor={`radio-yes-${id}`}>{Checked.Yes}</label>
      <input
        type="radio"
        id={`radio-no-${id}`}
        name={`switch-${id}`}
        value={Checked.No}
        ref={inputNoRef}
        onKeyDown={(e) => handleRadioPress(e, inputYesRef, inputNoRef, id)}
        onChange={() => handleToggleCheck(id, Checked.No)}
      />
      <label htmlFor={`radio-no-${id}`}>{Checked.No}</label>
    </div>
  );
}

export default ToggleSwitch;
