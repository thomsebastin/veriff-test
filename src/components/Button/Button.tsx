import { ReactNode } from "react";
import "./Button.scss";

function Button({
  children,
  isSubmitEnabled,
}: {
  children: ReactNode;
  isSubmitEnabled: () => boolean;
}) {
  return (
    <button type="submit" className="btn-submit" disabled={!isSubmitEnabled()}>
      {children}
    </button>
  );
}

export default Button;
