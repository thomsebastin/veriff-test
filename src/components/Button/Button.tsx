import "./Button.scss";

function Button({
  children,
  isSubmitEnabled,
}: {
  children: any;
  isSubmitEnabled: any;
}) {
  return (
    <button className="btn-submit" disabled={!isSubmitEnabled()}>
      {children}
    </button>
  );
}

export default Button;
