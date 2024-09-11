import { useState, useRef, useEffect, useContext } from "react";
import TimerContext from "../state/timerContextWithReducer";
import { transformSecondsToClock } from "../lib/global";
export const useInterval = (callback, delay) => {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== 0) {
      let id = setInterval(() => {
        savedCallback.current();
      }, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const TIME_TASK_FOCUS = 1800; // => 30 minutos
const TIME_REST = 300;
const ONE_SECOND = 1000;

const Timer = () => {
  const setttingTimeSeconds = true ? TIME_TASK_FOCUS : TIME_REST;
  const [seconds, setSeconds] = useState(setttingTimeSeconds);
  const [delay, setDelay] = useState(ONE_SECOND);
  //const { setTimerSeconds } = useContext(TimerContext);
  //const { setTime } = useContext(TimerContext);

  useInterval(() => {
    setSeconds(seconds - 1);
    if (seconds == 0) {
      setDelay(ONE_SECOND);
      setSeconds(setttingTimeSeconds);
    }
  }, delay);

  // useEffect(() => {
  //   setTimerSeconds(seconds);
  //   // setTime(seconds);
  // }, [seconds]);
  //console.log("rendering");
  return (
    <div className="timerContainer">
      <div className="time">{transformSecondsToClock(seconds)} </div>
      <div className="actions">
        <button
          onClick={() => {
            setDelay(ONE_SECOND);
          }}
        >
          <span className="material-symbols-outlined">play_circle</span>
        </button>
        <button
          onClick={() => {
            setDelay(0);
          }}
        >
          <span className="material-symbols-outlined">pause_circle</span>
        </button>
        <button
          onClick={() => {
            setDelay(ONE_SECOND);
            setSeconds(setttingTimeSeconds);
          }}
        >
          <span className="material-symbols-outlined">restart_alt</span>
        </button>
      </div>
    </div>
  );
};

export default Timer;
