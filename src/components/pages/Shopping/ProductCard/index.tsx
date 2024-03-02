import { useEffect, useRef, useState } from "react";
import {
  useAddOneItemMutation,
  useEditItemsMutation,
  useRemoveAllItemsMutation,
  useRemoveOneItemMutation,
} from "../../../../services/user/mutation";
import { Product } from "../../../../types";
import Stars from "../../../assets/Stars";

function ProductCard(props: Product & { quantity: number; userId: string }) {
  const { rating, image, title, price, _id, userId, quantity } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [inputValue, setInputValue] = useState(quantity);

  const useRemoveAllItems = useRemoveAllItemsMutation(userId, _id);
  const useAddOneItem = useAddOneItemMutation(userId, _id);
  const useRemoveOneItem = useRemoveOneItemMutation(userId, _id);

  const useEditItems = useEditItemsMutation(userId, _id, inputValue);

  useEffect(() => {
    setInputValue(quantity);
  }, [quantity]);

  const handleRemoveAllItems = () => {
    useRemoveAllItems.mutate();
  };

  const handleEditItems = () => {
    useEditItems.mutate();
  };

  const handleAddOneItem = () => {
    useAddOneItem.mutate();
  };

  const handleRemoveOneItem = () => {
    useRemoveOneItem.mutate();
  };

  return (
    <div className="flex justify-around gap-5 h-52 md:w-1/3 shadow-md rounded p-3">
      <p onClick={() => handleRemoveAllItems()}>X</p>
      <img className="w-1/3" src={image} alt={title} />
      <div className="flex flex-col gap-5">
        <h1 className="text-xl font-bold">{title}</h1>
        <p>${price}</p>
        <Stars rate={rating.rate} />
        <div className="display flex gap-2">
          <span
            className="cursor-pointer text-lg px-3"
            onClick={() => handleRemoveOneItem()}
          >
            -
          </span>
          <input
            ref={inputRef}
            type="number"
            value={inputValue}
            onBlur={() => handleEditItems()}
            onChange={(e) => setInputValue(parseInt(e.target.value))}
          />
          <span
            className="cursor-pointer text-lg px-3"
            onClick={() => handleAddOneItem()}
          >
            +
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
