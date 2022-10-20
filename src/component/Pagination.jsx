import React, { useEffect, useState } from "react";

const Pagination = ({ showPerPage, onPageChange, total }) => {
  const [counter, setCounter] = useState(1);
  const numberOfButton = Math.ceil(total / showPerPage);
  useEffect(() => {
    const value = showPerPage * counter;
    onPageChange(value - showPerPage, value);
  }, [counter]);

  const onButtonClick = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    }
    if (type === "next") {
      if (Math.ceil(total / showPerPage) === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  console.log(total);
  return (
    <div className="pagenumber-container">
      <div onClick={() => onButtonClick("prev")} className="pagenumber">
        previous
      </div>

      {new Array(numberOfButton).fill("").map((el, ind) => (
        <div
          className={`pagenumber ${ind + 1 === counter ? "active" : ""}`}
          onClick={() => setCounter(ind + 1)}
        >
          {ind + 1}
        </div>
      ))}

      <div onClick={() => onButtonClick("next")} className="pagenumber">
        next
      </div>
    </div>
  );
};

export default Pagination;
