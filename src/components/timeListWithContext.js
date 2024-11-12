import React, { useContext, useEffect, useState } from "react";
import TimerContext from "../state/timerContextWithReducer";
import { formatDate } from "../lib/global";

const ItemList = ({ list }) => {
  return (
    <ul>
      {list &&
        list.map((item, index) => {
          const { id, taskId, date, timer, dateStart, dateEnd } = item;
          const castStart = formatDate(dateStart);
          const castEnd = formatDate(dateEnd);
          return (
            <li key={index} className="time-item">
              {id}-{taskId}-{castStart}-{castEnd}-
            </li>
          );
        })}
    </ul>
  );
};

const ListTimes = () => {
  const { timer, fetchTimes } = useContext(TimerContext);
  useEffect(() => {
    fetchTimes();
  }, []);
  console.log(timer);
  return (
    <div className="listContainer">
      <ItemList list={timer.times}></ItemList>
    </div>
  );
};
export default ListTimes;
