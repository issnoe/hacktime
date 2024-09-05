import { useReducer, createContext } from "react";
import status from "./status";

const TimerContext = createContext();

const init = {
  data: {},
  status: status["idle"],
  message: "",
};

const actionTypes = {
  FOCUS_SELECTED: "FOCUS_SELECTED",
  ASYNC_SAVE_START: "ASYNC_SAVE_START",
  ASYNC_SAVE_FAILURE: "ASYNC_SAVE_FAILURE",
  ASYNC_SAVE_SUCCESS: "ASYNC_SAVE_SUCCESS",
};

const reduce = (state, action) => {
  switch (action.type) {
    case actionTypes.FOCUS_SELECTED:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export const TimeProvider = ({ children }) => {
  const [timer, dispatch] = useReducer(reduce, init);

  const focusSelected = (task) => {
    dispatch({ type: actionTypes.FOCUS_SELECTED, payload: task });
  };
  return (
    <TimerContext.Provider value={{ timer, focusSelected }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext;
