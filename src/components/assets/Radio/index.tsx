import { OrderBy } from "../../../types";

function Radio(
  props: React.InputHTMLAttributes<HTMLInputElement> & {
    values: OrderBy[];
    selectedValue: OrderBy;
  }
) {
  const { name, values, onChange, disabled, selectedValue } = props;

  return (
    <div
      className={`text-white text-sm flex gap-4 w-full md:w-1/3 self-start md:self-center  ${
        disabled && "cursor-not-allowed"
      }`}
    >
      <p>Order by:</p>
      {values.map((value, index) => {
        return (
          <label
            htmlFor={value}
            key={index}
            className={`${disabled && "cursor-not-allowed"}`}
          >
            {value[0].toUpperCase() + value.slice(1)}
            <input
              type="radio"
              className="ml-1 accent-pink-500"
              id={value}
              name={name}
              key={index}
              value={value}
              onChange={onChange}
              disabled={disabled}
              checked={selectedValue === value}
            ></input>
          </label>
        );
      })}
    </div>
  );
}

export default Radio;
