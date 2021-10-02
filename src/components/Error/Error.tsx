import { ReactElement, ReactNode } from "react";
import "./Error.scss";

function Error({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className="check-error">
      <p className="check-error__description">{children}</p>
    </div>
  );
}

export default Error;
