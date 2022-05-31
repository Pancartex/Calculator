import { useReducer } from "react";
import { compute } from "../utils";

const ACTIONS = {
  ADD_NUMBER: "add-number",
  ERASE: "erase",
  ADD_OPERATOR: "add-operator",
  EQUAL: "equal",
  ALL_CLEAR: "all-clear",
  CLEAR_ENTRY: "clear-entry",
};

const ACTIONS_REDUCER_MAP = {
  [ACTIONS.ADD_NUMBER]: (state, action) => {
    const { payload } = action;
    const { currentOperand, hasAnswer } = state;
    const isEmpty = !currentOperand;

    // hasAnswer: avoid not being able to do anything after resulting in a too long answer
    if (hasAnswer && payload.number === ".") {
      return {
        ...state,
        currentOperand: `0${payload.number}`,
        hasAnswer: false,
      };
    }

    if (hasAnswer) {
      return {
        ...state,
        currentOperand: payload.number,
        hasAnswer: false,
      };
    }

    // allow adding a single zero at the start
    if (payload.number === "0" && !currentOperand) {
      return {
        ...state,
        currentOperand: payload.number,
      };
    }

    // avoid adding multiple upfront zeros
    if (payload.number === "0" && currentOperand === "0") return state;

    // always add 0 in front of dot instead of empty
    if (payload.number === "." && (currentOperand === "0" || !currentOperand)) {
      return {
        ...state,
        currentOperand: `0${payload.number}`,
      };
    }

    // replace the upfront zero for number
    if (payload.number !== "0" && currentOperand === "0") {
      return { ...state, currentOperand: payload.number };
    }

    // avoid adding 2 dots
    if (payload.number === "." && currentOperand.includes(".")) return state;

    // cap length to 13 on main display else replace last number
    if (isEmpty || currentOperand.length < 13) {
      return {
        ...state,
        currentOperand: `${currentOperand || ""}${payload.number}`,
      };
    }

    return state;
  },

  [ACTIONS.ALL_CLEAR]: () => {
    return {
      currentOperand: "",
      previousOperand: "",
      operator: "",
    };
  },

  // clear the main display
  [ACTIONS.CLEAR_ENTRY]: (state) => {
    return {
      ...state,
      currentOperand: "",
    };
  },

  // erase last number added in the main display
  [ACTIONS.ERASE]: (state) => {
    const { currentOperand } = state;

    if (!currentOperand) return state;

    if (currentOperand.length === 1) {
      return {
        ...state,
        currentOperand: "0",
      };
    }
    return {
      ...state,
      currentOperand: `${currentOperand.slice(0, -1)}`,
    };
  },

  // add operator to secondary display and calculate if pressed more than once (unless currentOperand is empty)
  [ACTIONS.ADD_OPERATOR]: (state, action) => {
    const { currentOperand, previousOperand } = state;

    if (!currentOperand && !previousOperand) return state;

    if (!currentOperand) {
      return {
        ...state,
        operator: action.payload.operator,
      };
    }

    if (!previousOperand) {
      return {
        ...state,
        previousOperand: currentOperand,
        operator: action.payload.operator,
        currentOperand: "",
      };
    }
    return {
      ...state,
      previousOperand: compute(state),
      operator: action.payload.operator,
      currentOperand: "",
    };
  },

  // calculate the total and show on main display
  [ACTIONS.EQUAL]: (state) => {
    const { currentOperand, previousOperand } = state;

    if (!currentOperand || !previousOperand) return state;
    return {
      ...state,
      currentOperand: compute(state),
      previousOperand: "",
      operator: "",
      hasAnswer: true,
    };
  },
};

function calculatorReducer(state, action) {
  const actionReducer = ACTIONS_REDUCER_MAP[action.type];
  if (!actionReducer) return state;
  return actionReducer(state, action);
}

export function useCalculator() {
  const [{ currentOperand, previousOperand, operator, hasAnswer }, dispatch] =
    useReducer(calculatorReducer, {
      currentOperand: null,
      previousOperand: null,
      operator: null,
      hasAnswer: false,
    });

  const addNumber = (number) =>
    dispatch({ type: ACTIONS.ADD_NUMBER, payload: { number } });

  const erase = () => dispatch({ type: ACTIONS.ERASE });

  const addOperator = (operator) =>
    dispatch({ type: ACTIONS.ADD_OPERATOR, payload: { operator } });

  const allClear = () => dispatch({ type: ACTIONS.ALL_CLEAR });

  const clearEntry = () => dispatch({ type: ACTIONS.CLEAR_ENTRY });

  const equal = () => dispatch({ type: ACTIONS.EQUAL });

  return {
    currentOperand,
    previousOperand,
    operator,
    addNumber,
    erase,
    equal,
    addOperator,
    allClear,
    clearEntry,
  };
}
