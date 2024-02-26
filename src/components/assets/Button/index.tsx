import { ButtonHTMLAttributes } from "react";

function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & {
    text: string;
  }
) {
  const { text, children } = props;

  return (
    <button
      className="bg-gray-800 text-white rounded py-2 px-4 hover:bg-gray-700 flex gap-1 relative"
      {...props}
    >
      {text}
      <>{children}</>
    </button>
  );
}

export default Button;
