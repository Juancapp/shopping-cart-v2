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
    <div className="flex-1 mx-4 flex">
      <input
        type="text"
        className="font-light w-full bg-gray-800 rounded-l-md border border-gray-700 focus:border-gray-500 focus:ring-0 text-white px-4 py-2"
        placeholder="Search product..."
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <button
        onClick={() => handleClick(inputValue)}
        className="bg-gray-800 rounded-r-md border border-gray-700 focus:border-gray-500 focus:ring-0 text-white px-4 py-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-5.172-5.172M19 10a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
}

export default Searchbar;
