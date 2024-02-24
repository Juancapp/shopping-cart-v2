import {
  useAddOneItemMutation,
  useRemoveAllItemsMutation,
} from "../../../services/user/mutation";
import { Product } from "../../../types";
import Stars from "../Stars";

function Card(
  props: Product & {
    products: { quantity: number; product: Product }[];
    userId: string;
  }
) {
  const { title, price, image, rating, _id, products, userId } = props;

  const addItem = useAddOneItemMutation(userId, _id);

  const removeAllItems = useRemoveAllItemsMutation(userId, _id);

  const isProductInCart =
    !!products.length && products.some((item) => item.product._id === _id);

  return (
    <div className="h-96 flex flex-col py-4 px-3 justify-between card max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="card-image h-1/2">
        <img className="object-cover h-full" src={image} alt="Shoes" />
      </div>
      <h3 className="text-base font-bold text-gray-800">{title}</h3>
      <p className="text-lg text-gray-600">${price}</p>
      <Stars rate={rating.rate} />
      <div className="card-action flex justify-end">
        <button
          className="bg-gray-800 text-white rounded py-2 px-4 hover:bg-gray-700 flex gap-1 relative"
          onClick={() => addItem.mutate()}
        >
          <p>Add to cart</p>
          {isProductInCart && (
            <>
              <p className="text-xs bg-white color text-gray-800 text-bold rounded-full w-4 h-4">
                {products.find((item) => item.product._id === _id)?.quantity}
              </p>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  removeAllItems.mutate();
                }}
                className="flex items-center justify-center text-xs bg-white color text-gray-800 text-bold rounded-[100%] border-radio w-4 h-4 absolute border-solid border-gray-800 border-2 bottom-8 left-[90%]"
              >
                x
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Card;
