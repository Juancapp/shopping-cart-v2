import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Order } from "../../../types";

function Searchbar() {
  const [inputValue, setInputValue] = useState("");
  const searchParams = useSearchParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const param = queryParams.get(inputValue);

  const order = queryParams.get("orderBy");

  useEffect(() => {
    searchParams[1](queryParams);
  }, [location.search]);

  const handleClick = (value: string) => {
    queryParams.set("title", value);

    if (!value.length) {
      queryParams.delete("title");
    }

    if (order === Order.DEFAULT) {
      queryParams.delete("orderBy");
    }
  };

  return (
    <div className="flex justify-between align-middle px-0 pl-1 rounded-sm border-solid border-whites border-1 bg-white h-10 box-border">
      <input
        type="text"
        className="text-md w-full h-full border-none outline-none"
        placeholder="Search product..."
        onChange={(e) => setInputValue(e.target.value)}
        value={param ?? inputValue}
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
