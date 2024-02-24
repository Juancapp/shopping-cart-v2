import { ButtonHTMLAttributes } from "react";

function Button({
  onClick,
  text,
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
}) {
  return (
    <button
      className="bg-gray-900 text-white rounded py-2 px-4 hover:bg-gray-700 flex gap-1 w-min"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
