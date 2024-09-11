import { useContext } from "react";
import TimerContext from "../state/timerContextWithReducer";

const TimerFocus = () => {
  const { timer } = useContext(TimerContext);
  console.log("rendering");
  return (
    <div className="focusSelectedContainer">
      <span className="task"> {timer && timer?.data.description}</span>
    </div>
  );
};

export default TimerFocus;
