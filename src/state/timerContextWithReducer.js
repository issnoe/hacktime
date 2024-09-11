import { useReducer, createContext, useState, useMemo } from "react";
import status from "./status";
const { ipcRenderer } = require("electron");

const TimerContext = createContext();

const init = {
  data: {},
  times: [],
  status: status["idle"],
  message: "",
};

const actionTypes = {
  FOCUS_SELECTED: "FOCUS_SELECTED",
  ASYNC_SAVE_START: "ASYNC_SAVE_START",
  ASYNC_SAVE_FAILURE: "ASYNC_SAVE_FAILURE",
  ASYNC_SAVE_SUCCESS: "ASYNC_SAVE_SUCCESS",
  FETCH_TIMES_START: "FETCH_TIMES_START",
  FETCH_TIMES_FAILURE: "FETCH_TIMES_FAILURE",
  FETCH_TIMES_SUCCESS: "FETCH_TIMES_SUCCESS",
};

const reduce = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TIMES_START:
      return { ...state, status: status.LOADING };
    case actionTypes.FETCH_TIMES_FAILURE:
      return { ...state, status: status.FAILURE, message: action.payload };
    case actionTypes.FETCH_TIMES_SUCCESS:
      return { ...state, status: status.SUCCESS, times: action.payload };
    case actionTypes.FOCUS_SELECTED:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export const TimeProvider = ({ children }) => {
  const [timer, dispatch] = useReducer(reduce, init);
  const [timerSeconds, setTimerSeconds] = useState(0);

  //const [time, setTime] = useState(/* initial value */);

  //const time = useMemo(() => ({ time, setTime }), [time]);

  const focusSelected = (task) => {
    const _task = { ...task, timeStart: Date.now() };
    dispatch({ type: actionTypes.FOCUS_SELECTED, payload: _task });
  };

  const getTimes = async () => {
    return new Promise((resolve, rejected) => {
      ipcRenderer
        .invoke("get-times-by-day")
        .then((r) => {
          resolve(r);
        })
        .catch((error) => {
          rejected(error);
        });
    });
  };

  const fetchTimes = async () => {
    dispatch({ type: actionTypes.FETCH_TIMES_START });
    try {
      const _tasks = await getTimes();
      dispatch({
        type: actionTypes.FETCH_TIMES_SUCCESS,
        payload: _tasks,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_TIMES_FAILURE,
        payload: error,
      });
    }
  };
  return (
    <TimerContext.Provider
      value={{
        timer,
        focusSelected,
        timerSeconds,
        setTimerSeconds,
        fetchTimes,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext;
