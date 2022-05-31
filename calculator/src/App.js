import React from "react";
import NumberButton from "./components/NumberButton";
import OperatorButton from "./components/OperatorButton";
import "./index.css";
import { useCalculator } from "./hooks/useCalculator";

function App() {
  const {
    currentOperand,
    previousOperand,
    operator,
    addNumber,
    erase,
    equal,
    addOperator,
    allClear,
    clearEntry,
  } = useCalculator();

  return (
    <div className="App">
      <div className="smartphone">
        <div className="calculator">
          <div className="display">
            <div className="secondary-display">
              {previousOperand} {operator}
            </div>
            <div className="main-display">{currentOperand ?? ""}</div>
          </div>
          <div className="btn-grid">
            <button onClick={allClear} className="bg-lightgrey">
              C
            </button>

            <button onClick={clearEntry} className="bg-lightgrey">
              CE
            </button>

            <button onClick={erase} className="bg-lightgrey">
              <i className="fa-solid fa-delete-left"></i>
            </button>

            <OperatorButton
              onClick={() => addOperator("÷")}
              operator="÷"
              bg="bg-yellow"
            />

            <NumberButton
              onClick={() => addNumber("7")}
              number="7"
              bg="bg-grey"
            />

            <NumberButton
              onClick={() => addNumber("8")}
              number="8"
              bg="bg-grey"
            />

            <NumberButton
              onClick={() => addNumber("9")}
              number="9"
              bg="bg-grey"
            />

            <OperatorButton
              onClick={() => addOperator("*")}
              operator="*"
              bg="bg-yellow"
            />

            <NumberButton
              onClick={() => addNumber("4")}
              number="4"
              bg="bg-grey"
            />

            <NumberButton
              onClick={() => addNumber("5")}
              number="5"
              bg="bg-grey"
            />

            <NumberButton
              onClick={() => addNumber("6")}
              number="6"
              bg="bg-grey"
            />

            <OperatorButton
              onClick={() => addOperator("-")}
              operator="-"
              bg="bg-yellow"
            />

            <NumberButton
              onClick={() => addNumber("1")}
              number="1"
              bg="bg-grey"
            />

            <NumberButton
              onClick={() => addNumber("2")}
              number="2"
              bg="bg-grey"
            />

            <NumberButton
              onClick={() => addNumber("3")}
              number="3"
              bg="bg-grey"
            />

            <OperatorButton
              onClick={() => addOperator("+")}
              operator="+"
              bg="bg-yellow"
            />

            <NumberButton
              onClick={() => addNumber("0")}
              number="0"
              bg="bg-grey big-btn"
            />

            <NumberButton
              onClick={() => addNumber(".")}
              number="."
              bg="bg-grey"
            />

            <button onClick={equal} className="bg-yellow">
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
