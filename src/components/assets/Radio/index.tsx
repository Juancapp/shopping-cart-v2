import { OrderBy } from "../../../types";

function Radio(
  props: React.InputHTMLAttributes<HTMLInputElement> & {
    values: OrderBy[];
    selectedValue: OrderBy;
  }
) {
  const { name, values, onChange, disabled, selectedValue } = props;

  // const searchParams = useSearchParams();
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const order = queryParams.get("order");
  // const [radioValue, setRadioValue] = useState(OrderBy.PRICE);

  // useEffect(() => {
  //   if (order) {
  //     queryParams.set("orderBy", radioValue);
  //   } else {
  //     queryParams.delete("orderBy");
  //   }
  //   searchParams[1](queryParams);
  // }, [radioValue]);

  return (
    <div className="text-white text-lg flex gap-4 w-full md:w-1/3 self-start md:self-center">
      <p>Order by:</p>
      {values.map((value, index) => {
        return (
          <label htmlFor={value} key={index}>
            {value[0].toUpperCase() + value.slice(1)}
            <input
              type="radio"
              className="ml-1"
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
