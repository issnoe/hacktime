import { useContext, useEffect, useState } from "react";
import UserContext from "../state/userContext";
const AddInput = ({ handleTask }) => {
  const { user } = useContext(UserContext);
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(undefined);
  useEffect(() => {
    console.log("User context", user);
  }, []);
  return (
    <div>
      <input
        type="text"
        value={description}
        name="description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>
      <input
        value={time}
        type="number"
        name="time"
        onChange={(e) => {
          setTime(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          const _task = {
            description,
            time: Number(time),
            compleated: false,
          };
          handleTask(_task);
          setDescription("");
          setTime(0);
        }}
      >
        +
      </button>
    </div>
  );
};
export default AddInput;
