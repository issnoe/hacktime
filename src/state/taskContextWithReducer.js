import status from "./status";
import { booleanOppositive } from "../lib/global";
const { createContext, useReducer } = require("react");
const { ipcRenderer } = require("electron");
// {
//   id: 0,
//   description: "",
//   time: 1,
//   compleated: false,
// },

const init = {
  data: [],
  status: status["idle"],
  message: "",
};

const actionTypes = {
  FETCH_START: "FETCH_START",
  FETCH_FAILURE: "FETCH_FAILURE",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  ADD_START: "ADD_START",
  ADD_FAILURE: "ADD_FAILURE",
  ADD_SUCCESS: "ADD_SUCCESS",
  UPDATE_START: "UPDATE_START",
  UPDATE_FAILURE: "UPDATE_FAILURE",
  UPDATE_SUCCESS: "UPDATE_SUCCESS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return { ...state, status: status.LOADING };
    case actionTypes.FETCH_FAILURE:
      return { ...state, status: status.FAILURE, message: action.payload };
    case actionTypes.FETCH_SUCCESS:
      return { ...state, status: status.SUCCESS, data: action.payload };

    case actionTypes.ADD_START:
      return { ...state, status: status.LOADING };
    case actionTypes.ADD_FAILURE:
      return { ...state, status: status.FAILURE, message: action.payload };
    case actionTypes.ADD_SUCCESS:
      return { ...state, status: status.SUCCESS, data: action.payload };

    case actionTypes.UPDATE_START:
      return { ...state, status: status.LOADING };
    case actionTypes.UPDATE_FAILURE:
      return { ...state, status: status.FAILURE, message: action.payload };
    case actionTypes.UPDATE_SUCCESS:
      return { ...state, status: status.SUCCESS, data: action.payload };
    default:
      return state;
  }
};

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(reducer, init);

  const getTask = async () => {
    return new Promise((resolve, rejected) => {
      ipcRenderer
        .invoke("fetch-tasks")
        .then((r) => {
          resolve(r);
        })
        .catch((error) => {
          rejected(error);
        });
    });
  };

  const fetchData = async () => {
    dispatch({ type: actionTypes.FETCH_START });
    try {
      const _tasks = await getTask();
      dispatch({
        type: actionTypes.FETCH_SUCCESS,
        payload: _tasks,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_FAILURE,
        payload: error,
      });
    }
  };

  const add = async (task) => {
    dispatch({ type: actionTypes.ADD_START });
    const { description, time, project, completed = 0 } = task;
    ipcRenderer
      .invoke("insert-task", description, time, project, completed)
      .then(async (result) => {
        const _tasks = await getTask();
        dispatch({
          type: actionTypes.ADD_SUCCESS,
          payload: _tasks,
        });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.ADD_FAILURE });
      });
  };

  const markAsCompleated = (task) => {
    dispatch({ type: actionTypes.UPDATE_START });
    const { description, time, project, completed, id } = task;
    const _compleated = booleanOppositive(completed);
    ipcRenderer
      .invoke("update-task", id, description, time, project, _compleated)
      .then(async (result) => {
        const _tasks = await getTask();
        dispatch({
          type: actionTypes.UPDATE_SUCCESS,
          payload: _tasks,
        });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.UPDATE_FAILURE });
      });
  };

  return (
    <TaskContext.Provider value={{ tasks, add, markAsCompleated, fetchData }}>
      {children}
    </TaskContext.Provider>
  );
};
export default TaskContext;
