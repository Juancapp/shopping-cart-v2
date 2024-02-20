import { useLocation, useSearchParams } from "react-router-dom";
import { OrderBy } from "../../../types";

function Radio(
  props: React.InputHTMLAttributes<HTMLInputElement> & {
    values: OrderBy[];
  }
) {
  const { name, values } = props;

  const searchParams = useSearchParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const param = queryParams.get(name!);

  const handleChange = (value: string) => {
    queryParams.set(name!, value);
    searchParams[1](queryParams);
  };

  return (
    <div className="text-white text-lg flex gap-4 w-full md:w-1/3 self-start md:self-center">
      <p>Order by:</p>
      {values.map((value, index) => {
        return (
          <>
            <label htmlFor={value}>
              {value[0].toUpperCase() + value.slice(1)}
              <input
                type="radio"
                className="ml-1"
                id={value}
                name={name}
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                defaultChecked={param === value || index === 0}
              ></input>
            </label>
          </>
        );
      })}
    </div>
  );
}

export default Radio;
