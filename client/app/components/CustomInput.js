import React from "react";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      {" "}
      <textarea
        value={customInput}
        placeholder="Custom Input..."
        onChange={(e) => setCustomInput(e.target.value)}
        className={
          "focus:outline-none w-full h-full bg-transparent caret-white text-white"
        }
      ></textarea>
    </>
  );
};

export default CustomInput;