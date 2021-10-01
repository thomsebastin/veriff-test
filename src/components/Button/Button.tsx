import "./Button.scss";

function Button({
  children,
  isSubmitEnabled,
}: {
  children: any;
  isSubmitEnabled: any;
}) {
  return (
    <button type="submit" className="btn-submit" disabled={!isSubmitEnabled()}>
      {children}
    </button>
  );
}

export default Button;
