import { ReactElement, ReactNode } from "react";
import "./Success.scss";

function Success({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className="check-success">
      <p className="check-success__description">{children}</p>
    </div>
  );
}

export default Success;
