import { useState } from "react";
import Button from "../Button";

function Modal({ handleClick }: { handleClick: () => void }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="w-full h-full absolute z-50 flex justify-center items-center">
      <div className="bg-gray-800 [&>*:last-child]:self-end w-full p-5 rounded-xl md:w-1/3 h-1/3 flex flex-col justify-between">
        <h1 className="text-2xl text-white font-bold">User</h1>
        <input
          type="text"
          className="bg-gray-900 px-2 text-white border-[1px] border-solid border-gray-300 rounded"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          text="Confirm"
          onClick={() => {
            localStorage.setItem("name", inputValue);
            handleClick();
          }}
        />
      </div>
    </div>
  );
}

export default Modal;
