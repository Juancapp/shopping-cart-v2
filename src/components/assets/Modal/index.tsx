import { ReactNode } from "react";

function Modal({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full absolute z-50 flex justify-center items-center">
      <div className="bg-gray-800 [&>*:last-child]:self-end w-full p-5 rounded-xl md:w-1/3 h-1/3 flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}

export default Modal;
