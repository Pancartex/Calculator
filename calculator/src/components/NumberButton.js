import React from "react";

const NumberButton = ({ onClick, number, bg }) => {
  return (
    <button onClick={onClick} className={bg}>
      {number}
    </button>
  );
};

export default NumberButton;
