// deconstruct the state passed in equal and returns the correct calculation
export function compute({ previousOperand, currentOperand, operator }) {
  if (isNaN(previousOperand) || isNaN(currentOperand)) return "";
  if (operator === "+")
    return (Number(previousOperand) + Number(currentOperand)).toString();
  if (operator === "*")
    return (Number(previousOperand) * Number(currentOperand)).toString();
  if (operator === "-")
    return (Number(previousOperand) - Number(currentOperand)).toString();
  if (operator === "÷") {
    if (
      (Number(previousOperand) / Number(currentOperand)).toString().length > 12
    ) {
      return (
        Math.round(
          (Number(previousOperand) / Number(currentOperand)) * 100000000000
        ) / 100000000000
      ).toString();
    }
    return (Number(previousOperand) / Number(currentOperand)).toString();
  }
}
