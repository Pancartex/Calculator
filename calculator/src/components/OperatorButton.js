import React from "react";

const OperatorButton = ({ onClick, operator, bg }) => {
  return (
    <button onClick={onClick} className={bg}>
      {operator !== "*" ? operator : "x"}
    </button>
  );
};

export default OperatorButton;
