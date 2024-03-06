import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../../Spinner";
import { useUser } from "../../../../../services/user/query";
import { useIsMutating } from "@tanstack/react-query";

function Cart() {
  const useUserQuery = useUser();

  const mutations = [
    ["addOneItem"],
    ["removeOneItem"],
    ["removeAllItems"],
    ["editItem"],
  ];

  const [mutating, setMutating] = useState(false);

  useEffect(() => {
    const checkMutations = async () => {
      for (let i = 0; i < mutations.length; i++) {
        if (useIsMutating({ mutationKey: mutations[i] }) > 0) {
          setMutating(true);
          return;
        }
      }
      setMutating(false);
    };

    checkMutations();
  }, [useUserQuery?.dataUpdatedAt]);

  const productsTotalQuantity = useMemo(() => {
    return useUserQuery?.data?.data.products?.reduce(
      (acc: number, item: { quantity: number }) => {
        acc += item.quantity;
        return acc;
      },
      0
    );
  }, [useUserQuery?.dataUpdatedAt]);

  return (
    <div className="relative mr-2">
      <Link to="/shopping" className="text-white hover:text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </Link>
      <span className="absolute bottom-3 left-4 bg-red-500 rounded-full text-white mr-3 text-xs px-1.5 py-0.5">
        {useUserQuery?.isFetching || mutating ? (
          <Spinner />
        ) : (
          productsTotalQuantity
        )}
      </span>
    </div>
  );
}

export default Cart;
