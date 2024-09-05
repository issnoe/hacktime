import { useState, useRef, useEffect, useContext } from "react";

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
const transformSecondsToClock = (seconds) => {
  let minutes = seconds / 60;
  const segundos = seconds % 60;
  minutes = parseInt(minutes.toString(), 10);
  const secondsMask = segundos < 10 ? `0${segundos}` : segundos;
  const minutesMask = minutes < 10 ? `0${minutes}` : minutes;
  return `${minutesMask}:${secondsMask}`;
};

const Timer = () => {
  const setttingTimeSeconds = true ? TIME_TASK_FOCUS : TIME_REST;
  const [seconds, setSeconds] = useState(setttingTimeSeconds);
  const [delay, setDelay] = useState(ONE_SECOND);

  useInterval(() => {
    setSeconds(seconds - 1);
    if (seconds == 0) {
      setDelay(ONE_SECOND);
      setSeconds(setttingTimeSeconds);
    }
  }, delay);
  return (
    <div className="timerContainer">
      <div className="time">{transformSecondsToClock(seconds)} </div>
      <div className="actions">
        <button
          onClick={() => {
            setDelay(ONE_SECOND);
          }}
        >
          <span class="material-symbols-outlined">play_circle</span>
        </button>
        <button
          onClick={() => {
            setDelay(0);
          }}
        >
          <span class="material-symbols-outlined">pause_circle</span>
        </button>
        <button
          onClick={() => {
            setDelay(ONE_SECOND);
            setSeconds(setttingTimeSeconds);
          }}
        >
          <span class="material-symbols-outlined">restart_alt</span>
        </button>
      </div>
    </div>
  );
};

export default Timer;
