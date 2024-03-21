import { ButtonHTMLAttributes } from "react";

export enum ButtonVariant {
  PRIMARY = "bg-gray-800 text-white hover:bg-gray-900",
  BLACK = "bg-gray-900 hover:bg-black text-white",
  DISABLED = "bg-gray-300 text-white",
  RED = "bg-white border-2 text-red-800 hover:bg-red-800 hover:text-white",
  WHITE = "bg-white text-gray-800 border-2 border-gray-800 color-gray-800 hover:bg-gray-800 hover:text-white",
}

function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & {
    text?: string;
    variant?: ButtonVariant;
  }
) {
  const { text, children, onClick, variant = ButtonVariant.PRIMARY } = props;

  return (
    <button
      className={`${variant} rounded py-2 px-4 w-fit h-fit flex gap-1 relative`}
      onClick={onClick}
      {...props}
    >
      {text}
      <>{children}</>
    </button>
  );
}

export default Button;
