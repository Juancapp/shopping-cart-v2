import { useNavigate } from "react-router-dom";
import { Product } from "../../../types";
import Stars from "../Stars";

function Card(props: Product) {
  const { title, price, image, rating, _id } = props;

  const navigate = useNavigate();

  return (
    <div
      className="h-96 flex flex-col py-4 px-3 justify-between card max-w-sm rounded-lg overflow-hidden shadow-lg bg-white"
      onClick={() => navigate(`/product/${_id}`)}
    >
      <div className="card-image h-1/2">
        <img className="object-cover h-full" src={image} alt="Shoes" />
      </div>
      <h3 className="text-base font-bold text-gray-800">{title}</h3>
      <p className="text-lg text-gray-600">${price}</p>
      <Stars rate={rating.rate} />
      <div className="card-action flex justify-end">
        <button className="bg-gray-800 text-white rounded py-2 px-4 hover:bg-gray-700">
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default Card;
