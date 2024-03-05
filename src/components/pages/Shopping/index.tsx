import { useEffect, useMemo, useState } from "react";
import { useUser } from "../../../services/user/query";
import ProductCard from "./ProductCard";
import Button, { ButtonVariant } from "../../assets/Button";
import Modal from "../../assets/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Purchase, Status } from "../../../types";
import { postRequest, url } from "../../../config/api";
import { useNavigate } from "react-router-dom";
import Spinner from "../../assets/Spinner";

function Shopping() {
  const userQuery = useUser();
  const [modalDisplay, setModalDisplay] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const usePurchaseMutation = useMutation<void, Error, Purchase>({
    mutationKey: ["postPurchase"],
    mutationFn: async (variables: Purchase) => {
      await postRequest<Purchase>(`${url}/purchase`, variables);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["purchases"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      setModalDisplay(false);
    },
  });

  const totalPrice = useMemo(
    () =>
      userQuery?.data?.data.products.reduce((total, product) => {
        return (
          Math.round((total + product.product.price * product.quantity) * 100) /
          100
        );
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

  const handleConfirmClick = () => {
    const body = {
      user: userQuery?.data?.data._id!,
      totalPrice: totalPrice!,
      totalQuantity: totalQuantity!,
      products: userQuery?.data?.data?.products!,
      status: Status.PENDING,
    };

    usePurchaseMutation.mutate(body);
  };

  useEffect(() => {
    if (totalQuantity === 0) {
      navigate("/home");
    }
  }, [totalQuantity]);

  return (
    <div className="w-full flex flex-col gap-5 justify-center py-10 lg:items-center">
      {modalDisplay && (
        <Modal>
          {usePurchaseMutation.isPending ? (
            <Spinner toModal={true} />
          ) : (
            <>
              <h1 className="text-white text-xl font-extrabold">Buy</h1>
              <p className="text-white">Total price: {totalPrice}</p>
              <p className="text-yellow-400 italic text-sm">
                Advice:
                <span className="text-white ml-2">
                  Purchases can be made up to 30 minutes after cancellation.
                  Then its status is "success" and cannot be cancelled. Go to
                  the "My purchases" section for more information.
                </span>
              </p>
              <div className="flex w-min self-end gap-2">
                <Button
                  text="Cancel"
                  variant={ButtonVariant.PRIMARY}
                  onClick={() => setModalDisplay(false)}
                />
                <Button
                  text="Confirm"
                  variant={ButtonVariant.BLACK}
                  onClick={handleConfirmClick}
                />
              </div>
            </>
          )}
        </Modal>
      )}
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
        <Button
          disabled={totalQuantity === 0}
          onClick={() => setModalDisplay(true)}
          text="Buy"
        />
      </div>
    </div>
  );
}

export default Shopping;
