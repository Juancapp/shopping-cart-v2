import { useState } from "react";
import Stars from "../../../assets/Stars";
import { useProduct } from "../../../../services/products/query";
import { useParams } from "react-router-dom";

function ProductPage() {
  const [inputValue, setInputValue] = useState("");

  const { id } = useParams();

  const productQuery = useProduct(id!);

  const { isLoading } = productQuery;

  if (isLoading) return <h1>loading</h1>;

  const { title, image, description, rating, price } = productQuery.data?.data!;

  return (
    <div className="grow inline-block">
      <div className="h-1/2">
        <img src={image} alt={title} className="h-44" />
        <div>
          <h1>{title}</h1>
          <Stars rate={rating.rate} />
          <p>${price}</p>
          <div>{description}</div>
          <div>
            <p>Quantity:</p>
            <button>-</button>
            <input
              type="number"
              min="1"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button>+</button>
          </div>
          <button>Buy</button>
          <button>Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
