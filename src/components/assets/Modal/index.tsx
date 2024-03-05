import { ReactNode } from "react";

function Modal({ children }: { children: ReactNode }) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50">
      <div className="bg-gray-800 w-full p-5 rounded-xl md:w-1/3 h-1/3 flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}

export default Modal;
