import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

function Searchbar(
  props: React.HTMLProps<HTMLButtonElement> &
    React.InputHTMLAttributes<HTMLInputElement> & {
      handleClick: (arg0: string) => void;
      initialValue: string;
    }
) {
  const { handleClick, initialValue } = props;
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (initialValue) setInputValue(initialValue);
  }, []);

  return (
    <div className="flex justify-between align-middle px-0 pl-1 rounded-sm border-solid border-whites border-1 bg-white h-10 box-border">
      <input
        type="text"
        className="text-md w-full h-full border-none outline-none caret-pink-500"
        placeholder="Search product..."
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <button
        onClick={() => handleClick(inputValue)}
        className="h-full w-14 bg-gray-900 flex justify-center items-center"
      >
        <MagnifyingGlassIcon className="text-white w-8" />
      </button>
    </div>
  );
}

export default Searchbar;
