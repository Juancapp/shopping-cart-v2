function Select<T extends string | number | readonly string[] | undefined>({
  name,
  label,
  options,
  onChange,
}: React.InputHTMLAttributes<HTMLSelectElement> & {
  name: string;
  label: string;
  options: {
    value: T;
    title: string;
  }[];
}) {
  return (
    <div className="w-1/3">
      <label htmlFor={name} className="text-white">
        {label}:
        <select
          className="bg-blue-950 ml-3 text-white p-2 border-2 rounded cursor-pointer w-3/4"
          name={name}
          id={name}
          onChange={onChange}
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
