import "./ToggleSwitch.scss";

function ToggleSwitch({
  id,
  handleToggleCheck,
}: {
  id: string;
  handleToggleCheck: any;
}) {
  return (
    <div className="toggle-switch">
      <input
        type="radio"
        id={`radio-yes-${id}`}
        name={`switch-${id}`}
        value="yes"
        onChange={() => handleToggleCheck(id, "yes")}
      />
      <label htmlFor={`radio-yes-${id}`}>Yes</label>
      <input
        type="radio"
        id={`radio-no-${id}`}
        name={`switch-${id}`}
        value="no"
        onChange={() => handleToggleCheck(id, "no")}
      />
      <label htmlFor={`radio-no-${id}`}>No</label>
    </div>
  );
}

export default ToggleSwitch;
