import React from "react";
const List = ({ list, updateCompleated }) => {
  return (
    <ul>
      {list.map((item, index) => {
        const { description, compleated } = item;
        return (
          <li>
            <input
              type="checkbox"
              value={compleated}
              onChange={() => {
                updateCompleated(index);
              }}
            ></input>
            {description}
          </li>
        );
      })}
    </ul>
  );
};
export default List;
