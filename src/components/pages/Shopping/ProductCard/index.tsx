import { useEffect, useRef, useState } from "react";
import {
  useAddOneItemMutation,
  useEditItemsMutation,
  useRemoveAllItemsMutation,
  useRemoveOneItemMutation,
} from "../../../../services/user/mutation";
import { Product } from "../../../../types";
import Stars from "../../../assets/Stars";
import DeleteButton from "../../../assets/DeleteButton";

function ProductCard(props: Product & { quantity: number; userId: string }) {
  const { rating, image, title, price, _id, userId, quantity } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [inputValue, setInputValue] = useState(quantity);

  const useRemoveAllItems = useRemoveAllItemsMutation(userId, _id);
  const useAddOneItem = useAddOneItemMutation(userId, _id);
  const useRemoveOneItem = useRemoveOneItemMutation(userId, _id);
  const useEditItems = useEditItemsMutation(userId, _id, inputValue);

  const someMutationIsPending =
    useAddOneItem.isPending ||
    useRemoveAllItems.isPending ||
    useEditItems.isPending ||
    useRemoveOneItem.isPending;

  useEffect(() => {
    setInputValue(quantity);
  }, [quantity]);

  return (
    <div className="flex justify-around gap-5 md-w-1/2 lg:w-1/3 shadow-md rounded p-4 relative">
      <img className="w-1/3" src={image} alt={title} />
      <div className="flex flex-col gap-5 flex-1">
        <h1 className="text-xl font-bold">{title}</h1>
        <p>${price}</p>
        <Stars rate={rating.rate} />
        <div className="display flex gap-2">
          <button
            className={`${
              someMutationIsPending && "cursor-pointer"
            } text-lg text-bold px-3`}
            onClick={() => useRemoveOneItem.mutate()}
            disabled={someMutationIsPending}
          >
            -
          </button>
          <input
            ref={inputRef}
            type="number"
            value={inputValue}
            onBlur={() => useEditItems.mutate()}
            onChange={(e) => setInputValue(parseInt(e.target.value))}
            className="shadow-inner w-10 text-center"
            disabled={someMutationIsPending}
          />
          <button
            className={`${
              someMutationIsPending ? "cursor-default" : "cursor-pointer"
            } text-lg text-bold px-3`}
            onClick={() => useAddOneItem.mutate()}
            disabled={someMutationIsPending}
          >
            +
          </button>
        </div>
      </div>
      <DeleteButton
        onClick={() => useRemoveAllItems.mutate()}
        productId={_id}
        userId={userId}
      />
    </div>
  );
}

export default ProductCard;
