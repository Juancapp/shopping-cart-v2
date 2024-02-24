import { useMemo } from "react";
import { useUserStore } from "../../../zustand/store";

function Cart() {
  const user = useUserStore((state) => state.user);
  const products = "products" in user ? user.products : [];

  const productsTotalQuantity = useMemo(() => {
    return products.reduce((acc, item) => {
      acc += item.quantity;
      return acc;
    }, 0);
  }, [products]);

  return (
    <div className="relative">
      <a href="#" className="text-white hover:text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
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
      </a>
      <span className="absolute top-0 right-0 bg-red-500 rounded-full text-white text-xs px-1 py-0.5">
        {productsTotalQuantity}
      </span>
    </div>
  );
}

export default Cart;
