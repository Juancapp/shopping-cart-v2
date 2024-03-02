import { useMemo } from "react";
import { useUser } from "../../../services/user/query";
import ProductCard from "./ProductCard";

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
    <div className="w-full flex flex-col gap-20 justify-center items-center">
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
    </div>
  );
}

export default Shopping;
