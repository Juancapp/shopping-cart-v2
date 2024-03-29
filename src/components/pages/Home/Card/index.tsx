import { useNavigate } from "react-router-dom";
import {
  useAddOneItemMutation,
  useRemoveAllItemsMutation,
} from "../../../../services/user/mutation";
import { Product } from "../../../../types";
import Button from "../../../assets/Button";
import Spinner from "../../../assets/Spinner";
import Stars from "../../../assets/Stars";

function Card(
  props: Product & {
    products: { quantity: number; product: Product }[];
    userId: string;
  }
) {
  const { title, price, image, rating, _id, products, userId, category } =
    props;

  const navigate = useNavigate();

  const addItem = useAddOneItemMutation(userId, _id);
  const removeAllItems = useRemoveAllItemsMutation(userId, _id);

  const isProductInCart =
    !!products.length && products.some((item) => item.product._id === _id);

  return (
    <div
      onClick={() => navigate(`../product/${_id}`)}
      className="h-96 flex flex-col py-4 cursor-pointer px-3 justify-between card max-w-sm rounded-lg overflow-hidden shadow-lg bg-white"
    >
      <div className="card-image h-1/2">
        <img className="object-cover h-full" src={image} alt="Shoes" />
      </div>
      <h3 className="text-base font-bold text-gray-800">{title}</h3>
      <p className=" text-gray-600 font-extralight">{category}</p>
      <p className="text-lg text-gray-600">${price}</p>
      <Stars rate={rating.rate} />
      <div className="card-action flex justify-end">
        <Button
          text="Add to cart"
          onClick={(e) => {
            e.stopPropagation();
            addItem.mutate();
          }}
          disabled={addItem.isPending || removeAllItems.isPending}
        >
          {addItem.isPending || removeAllItems.isPending ? (
            <Spinner />
          ) : (
            isProductInCart && (
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
            )
          )}
        </Button>
      </div>
    </div>
  );
}

export default Card;
