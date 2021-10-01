import "./Success.scss";

function Success({ children }: { children: any }): any {
  return (
    <div className="check-success">
      <p className="check-success__description">{children}</p>
    </div>
  );
}

export default Success;
