import { ButtonHTMLAttributes } from "react";

function Button({
  onClick,
  text,
  children,
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
}) {
  return (
    <button
      className="bg-gray-800 text-white rounded py-2 px-4 hover:bg-gray-700 flex gap-1 relative"
      onClick={onClick}
    >
      {text}
      <>{children}</>
    </button>
  );
}

export default Button;
