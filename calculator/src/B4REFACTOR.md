// function reducer(state, { type, payload }) {
// const { currentOperand, previousOperand } = state;
// const isEmpty = currentOperand ? false : true;
// // eslint-disable-next-line default-case
// switch (type) {
// // add selected number to the main display (lots of handling edge cases)
// case ACTIONS.ADD_NUMBER:
// // allow adding a single zero
// if (payload.number === "0" && !currentOperand) {
// return {
// ...state,
// currentOperand: payload.number,
// };
// }
// // avoid adding multiple upfront zeros
// if (payload.number === "0" && currentOperand === "0") return state;
// // always add 0 in front of dot instead of empty
// if (
// payload.number === "." &&
// (currentOperand === "0" || !currentOperand)
// ) {
// return {
// ...state,
// currentOperand: "0.",
// };
// }
// // replace the upfront zero for number
// if (payload.number !== "0" && currentOperand === "0") {
// return { ...state, currentOperand: payload.number };
// }
// // avoid adding 2 dots
// if (payload.number === "." && currentOperand.includes(".")) return state;
// // cap length to 13 on main display else replace last number
// if (isEmpty || currentOperand.length < 13) {
// return {
// ...state,
// currentOperand: `${currentOperand || ""}${payload.number}`,
// };
// } else {
// return {
// ...state,
// currentOperand: `${currentOperand.slice(0, -1)}${payload.number}`,
// };
// }
// // resets everything back to 0
// case ACTIONS.ALL_CLEAR:
// return {
// currentOperand: "",
// previousOperand: "",
// operator: "",
// };
// // clear the main display
// case ACTIONS.CLEAR_ENTRY:
// return {
// ...state,
// currentOperand: "",
// };
// // erase last number added in the main display
// case ACTIONS.ERASE:
// if (currentOperand.length === 1) {
// return {
// ...state,
// currentOperand: "0",
// };
// }
// return {
// ...state,
// currentOperand: `${currentOperand.slice(0, -1)}`,
// };
// // add operator to secondary display and calculate if pressed more than once (unless currentOperand is empty)
// case ACTIONS.ADD_OPERATOR:
// if (!currentOperand && !previousOperand) return state;
// if (!currentOperand) {
// return {
// ...state,
// operator: payload.operator,
// };
// }
// if (!previousOperand) {
// return {
// ...state,
// previousOperand: currentOperand,
// operator: payload.operator,
// currentOperand: "",
// };
// }
// return {
// ...state,
// previousOperand: equal(state),
// operator: payload.operator,
// currentOperand: "",
// };
// // calculate the total and show on main display
// case ACTIONS.EQUAL:
// if (!currentOperand || !previousOperand) return state;
// return {
// ...state,
// currentOperand: equal(state),
// previousOperand: "",
// operator: "",
// };
// }
// }

// const [{ currentOperand, previousOperand, operator }, dispatch] = useReducer(
// reducer,
// {}
// );
