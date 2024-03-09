import { ButtonHTMLAttributes, ReactNode } from "react";

function PageButton(
  props: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }
) {
  const { children } = props;

  return (
    <button
      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      {...props}
    >
      {children}
    </button>
  );
}

export default PageButton;
