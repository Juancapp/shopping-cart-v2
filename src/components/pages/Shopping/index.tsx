import { useMemo } from "react";
import { useUser } from "../../../services/user/query";
import ProductCard from "./ProductCard";
import Button from "../../assets/Button";

function Shopping() {
  const userQuery = useUser();

  const totalPrice = useMemo(
    () =>
      userQuery?.data?.data.products.reduce((total, product) => {
        return total + product.product.price * product.quantity;
      }, 0),
    [userQuery?.dataUpdatedAt]
  );

  const totalQuantity = useMemo(
    () =>
      userQuery?.data?.data.products.reduce((total, product) => {
        return total + product.quantity;
      }, 0),
    [userQuery?.dataUpdatedAt]
  );

  return (
    <div className="w-full flex flex-col gap-5 justify-center py-10 lg:items-center">
      <h1 className="text-6xl font-extrabold mb-20 self-center">
        PRODUCT CART
      </h1>
      {userQuery?.data?.data?.products.map((item) => {
        return (
          <ProductCard
            {...item.product}
            _id={item.product._id}
            quantity={item.quantity}
            userId={userQuery?.data?.data._id}
            key={item.product._id}
          />
        );
      })}
      <div className="lg:fixed top-[30%] right-[10%] w-fit self-center shadow-lg p-10 rounded-md">
        <p className="font-bold">
          Total products: <span className="font-normal">{totalQuantity}</span>
        </p>
        <p className="mb-4 font-bold">
          Total price: <span className="font-normal">${totalPrice}</span>
        </p>
        <Button text="Buy" />
      </div>
    </div>
  );
}

export default Shopping;
