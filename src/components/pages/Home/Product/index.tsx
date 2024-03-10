import { ChangeEvent, useState } from "react";
import Stars from "../../../assets/Stars";
import { useProduct } from "../../../../services/products/query";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../assets/Button";
import PageButton from "../../../assets/PageButton";
import { useBuyItemMutation } from "../../../../services/user/mutation";
import { useUser } from "../../../../services/user/query";
import Spinner from "../../../assets/Spinner";

function Product() {
  const [inputValue, setInputValue] = useState(1);

  const { id } = useParams();

  const navigate = useNavigate();

  const userQuery = useUser();

  const productQuery = useProduct(id!);

  const userId = userQuery?.data?.data?._id || "";

  const useBuyItem = useBuyItemMutation(userId, id!, inputValue);

  const { isLoading } = productQuery;

  if (isLoading) return <h1>loading</h1>;

  const { title, image, description, rating, price } = productQuery.data?.data!;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let quantity = e.target.value;

    while (quantity.charAt(0) === "0") {
      quantity = quantity.slice(1);
    }

    setInputValue(parseInt(quantity));
  };

  return (
    <div className="absolute flex p-10 md:p-0 md:py-20 flex-col md:flex-row gap-10 md:w-[40%] md:right-[33%]">
      <img src={image} alt={title} className="w-1/2 md:h-72" />
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Stars rate={rating.rate} />
        <p className="text-xl">${price}</p>
        <div>{description}</div>
        <div>
          <p>Quantity:</p>
          <PageButton
            onClick={() =>
              inputValue > 1 &&
              setInputValue((previousValue) => previousValue - 1)
            }
          >
            -
          </PageButton>
          <input
            type="number"
            className="mx-3 px-2 w-1/3 border-solid border-2 rounded-md"
            min="1"
            value={inputValue}
            onChange={(e) => handleChange(e)}
          />
          <PageButton
            onClick={() => setInputValue((previousValue) => previousValue + 1)}
          >
            +
          </PageButton>
        </div>
        <Button
          text={!useBuyItem.isPending ? "Buy" : ""}
          onClick={async () => {
            const res = await useBuyItem.mutateAsync();
            if (res.status < 400) {
              navigate("/shopping");
            }
          }}
        >
          {useBuyItem.isPending && <Spinner />}
        </Button>
      </div>
    </div>
  );
}

export default Product;
