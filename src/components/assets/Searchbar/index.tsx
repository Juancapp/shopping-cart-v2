import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Searchbar(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.InputHTMLAttributes<HTMLInputElement>
) {
  const { onChange, onClick } = props;

  return (
    <div className="flex justify-between align-middle px-0 pl-1 rounded-sm border-solid border-whites border-1 bg-white h-10 box-border">
      <input
        type="text"
        className="text-md w-full h-full border-none outline-none"
        onChange={onChange}
        placeholder="Search product..."
      />
      <button
        onClick={onClick}
        className="h-full w-14 bg-gray-900 flex justify-center items-center"
      >
        <MagnifyingGlassIcon className="text-white w-8" />
      </button>
    </div>
  );
}

export default Searchbar;
