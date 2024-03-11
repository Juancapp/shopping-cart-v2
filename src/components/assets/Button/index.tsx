import { ButtonHTMLAttributes } from "react";

export enum ButtonVariant {
  PRIMARY = "bg-gray-800",
  BLACK = "bg-gray-900",
  RED = "bg-white border-2 text-red-800 hover:bg-red-800 hover:text-white",
}

function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & {
    text: string;
    variant?: ButtonVariant;
  }
) {
  const { text, children, onClick, variant = ButtonVariant.PRIMARY } = props;

  return (
    <button
      className={`${variant} text-white rounded py-2 px-4 w-fit hover:bg-gray-700 flex gap-1 relative`}
      onClick={onClick}
      {...props}
    >
      {text}
      <>{children}</>
    </button>
  );
}

export default Button;
