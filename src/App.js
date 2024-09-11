//import Realm from "realm";
import "./App.css";
import "./index.css";
import { useState } from "react";
import List from "./components/listWithContext";
import AddInput from "./components/addWithContext";
import { UserProvider } from "./state/userContext";
import { TaskProvider } from "./state/taskContextWithReducer";
import Timer from "./components/timer";
import { TimeProvider } from "./state/timerContextWithReducer";
import TimerFocus from "./components/timeWithContext";

function App() {
  const [tasks, setTask] = useState([]);

  const handleTask = (task) => {
    const _tasks = [...tasks, task];
    setTask(_tasks);
  };
  const updateCompleated = (index) => {
    const _tasks = tasks.map((task, _index) => {
      if (index === _index) {
        return { ...task, compleated: !task.compleated };
      } else {
        return task;
      }
    });
    setTask(_tasks);
  };
  return (
    <TimeProvider>
      <TaskProvider>
        <UserProvider>
          <TimerFocus></TimerFocus>
          <div className="main">
            <div className="timerBox">
              <Timer></Timer>
            </div>
            <div className="taskContainer">
              <AddInput handleTask={handleTask}></AddInput>
              <List list={tasks} updateCompleated={updateCompleated}></List>
            </div>
          </div>
        </UserProvider>
      </TaskProvider>
    </TimeProvider>
  );
}

export default App;
