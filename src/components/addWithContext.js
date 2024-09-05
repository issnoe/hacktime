import { useContext, useEffect, useState, useRef } from "react";
import TaskContext from "../state/taskContextWithReducer";

const AddInput = ({ handleTask }) => {
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(1);
  useEffect(() => {}, []);

  const { add } = useContext(TaskContext);
  const inputText = useRef(null);

  return (
    <div className="entryContainer">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const _task = {
            description,
            time: Number(time),
          };
          add(_task);
          setDescription("");
          setTime(1);
          inputText.current.focus();
        }}
      >
        <input
          placeholder="Add a task"
          ref={inputText}
          type="text"
          className="addText"
          value={description}
          name="description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
        <input
          className="addNumber"
          value={time}
          type="number"
          name="time"
          onChange={(e) => {
            setTime(e.target.value);
          }}
        ></input>
        <input className="hidden" type="submit"></input>
      </form>
    </div>
  );
};
export default AddInput;
