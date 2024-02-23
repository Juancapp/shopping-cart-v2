function Select<T extends string | number | readonly string[] | undefined>({
  name,
  label,
  options,
  onChange,
  defaultValue,
}: React.InputHTMLAttributes<HTMLSelectElement> & {
  name: string;
  label: string;
  options: {
    value: T;
    title: string;
  }[];
  defaultValue: string;
}) {
  return (
    <div className="w-full md:w-1/3">
      <label htmlFor={name} className="text-white text-sm flex items-center">
        {label}:
        <select
          className="bg-gray-800 rounded-md border border-gray-700 focus:border-gray-500 focus:ring-0 text-white px-4 py-2 appearance-none w-full md:w-3/4 ml-3"
          name={name}
          id={name}
          onChange={onChange}
          defaultValue={defaultValue}
        >
          {options.map((option, index) => {
            return (
              <option key={index} value={option.value} className="text-sm">
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
