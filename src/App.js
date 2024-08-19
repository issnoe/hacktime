//import Realm from "realm";
import "./App.css";
import { useState } from "react";
import List from "./components/list";
import AddInput from "./components/add";
import { UserProvider } from "./state/userContext";

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
    <UserProvider>
      <AddInput handleTask={handleTask}></AddInput>
      <List list={tasks} updateCompleated={updateCompleated}></List>
    </UserProvider>
  );
}

export default App;
