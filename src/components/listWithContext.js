import React, { useContext, useEffect, useState } from "react";
import TaskContext from "../state/taskContextWithReducer";
import TimerContext from "../state/timerContextWithReducer";

const ItemList = ({ list, markAsCompleated, focusSelected = () => {} }) => {
  return (
    <ul>
      {list &&
        list.map((item, index) => {
          const { description, completed } = item;
          const colorStatus =
            completed === 1
              ? "material-symbols-outlined green-color"
              : "material-symbols-outlined gray-color";

          return (
            <li key={index} className="task-item">
              <button
                onClick={() => {
                  markAsCompleated(item);
                }}
              >
                <span className={colorStatus}>check_circle</span>
              </button>
              <button
                onClick={() => {
                  focusSelected(item);
                }}
              >
                <span className="material-symbols-outlined">play_circle</span>
              </button>
              {description}
            </li>
          );
        })}
    </ul>
  );
};

const List = () => {
  const { tasks, markAsCompleated, fetchData } = useContext(TaskContext);
  const { focusSelected } = useContext(TimerContext);
  const [showList, setShowList] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  const completedTasks = tasks.data.filter((x) => x.completed === 1);
  const todoTasks = tasks.data.filter((x) => x.completed === 0);
  const message = showList ? "Show completed tasks" : "Hide completed tasks";

  return (
    <div className="listContainer">
      <ItemList
        list={todoTasks}
        markAsCompleated={markAsCompleated}
        focusSelected={focusSelected}
      ></ItemList>
      <button className="btn-primary" onClick={() => setShowList(!showList)}>
        {message}
      </button>
      {showList && (
        <ItemList
          list={completedTasks}
          markAsCompleated={markAsCompleated}
        ></ItemList>
      )}
    </div>
  );
};
export default List;
