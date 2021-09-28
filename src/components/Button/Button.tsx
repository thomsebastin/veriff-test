// import React from "react";
// import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({ children, ...rest }: { children: any }) => {
  return (
    <button className="btn-submit" {...rest}>
      {children}
    </button>
  );
};

// Button.propTypes = {
//   children: PropTypes.string.isRequired,
//   disabled: PropTypes.bool,
//   type: PropTypes.string,
//   onClick: PropTypes.func
// };

export default Button;
