import { ReactElement } from "react";
import "./Description.scss";

function Description({ description }: { description: string }): ReactElement {
  return <p className="description">{description}</p>;
}

export default Description;
