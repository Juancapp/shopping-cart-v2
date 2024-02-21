import { useLocation, useSearchParams } from "react-router-dom";
import { Category, Order, OrderBy } from "../../../types";

function Select<T extends string | number | readonly string[] | undefined>({
  name,
  label,
  options,
}: React.InputHTMLAttributes<HTMLSelectElement> & {
  name: string;
  label: string;
  options: {
    value: T;
    title: string;
  }[];
}) {
  const searchParams = useSearchParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const param = queryParams.get(name);

  const handleChange = (value: string) => {
    if (name === "category") {
      if (value !== Category.ALL) {
        queryParams.set("category", value);
      } else {
        queryParams.delete("category");
      }
    } else if (name === "order") {
      if (value !== Order.DEFAULT) {
        queryParams.set("order", value);
        if (!queryParams.get("orderBy")) {
          queryParams.set("orderBy", OrderBy.PRICE);
        }
      } else {
        queryParams.delete("order");
        queryParams.delete("orderBy");
      }
    }

    searchParams[1](queryParams);
  };

  return (
    <div className="w-full md:w-1/3">
      <label htmlFor={name} className="text-white flex items-center">
        {label}:
        <select
          className="bg-blue-950 ml-3 text-white p-2 border-2 rounded cursor-pointer w-full md:w-3/4"
          name={name}
          id={name}
          onChange={(e) => handleChange(e.target.value)}
          defaultValue={param ?? options[0].value}
        >
          {options.map((option, index) => {
            return (
              <option key={index} value={option.value}>
                {option.title}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
}

export default Select;
