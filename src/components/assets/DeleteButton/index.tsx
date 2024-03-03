import { ButtonHTMLAttributes } from "react";
import { useIsMutating } from "@tanstack/react-query";
import Spinner from "../Spinner";

function DeleteButton(
  props: ButtonHTMLAttributes<HTMLButtonElement> & {
    userId: string;
    productId: string;
  }
) {
  const { userId, productId } = props;
  const isMutatingUser = useIsMutating({
    mutationKey: ["removeAllItems", userId, productId],
  });

  return (
    <button
      onClick={props.onClick}
      className="bg-gray-800 text-white rounded h-5 w-5 hover:bg-red-600 flex justify-center items-center gap-1 absolute right-1"
    >
      {isMutatingUser ? (
        <Spinner />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
    </button>
  );
}

export default DeleteButton;
