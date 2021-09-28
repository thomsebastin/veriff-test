import "./Error.scss";

function Error({ children }: { children: any }): any {
  return (
    <div className="check-error">
      <p className="check-error__description">{children}</p>
    </div>
  );
}

export default Error;
