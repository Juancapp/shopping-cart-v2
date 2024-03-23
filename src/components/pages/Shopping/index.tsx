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
import { useToastStore } from "../../../zustand/store";
import { ToastType } from "../../../zustand/types";
import { AxiosError } from "axios";

function Shopping() {
  const userQuery = useUser();
  const userPaymentMethods = userQuery?.data?.data?.paymentMethods;
  const [modalDisplay, setModalDisplay] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setToast } = useToastStore((state) => state);
  const [inputValue, setInputValue] = useState("");

  const useAddPurchaseMutation = useMutation<
    void,
    AxiosError<{ message?: string }>,
    {
      data: Omit<Purchase, "_id">;
      headers: { cvc: string };
    }
  >({
    mutationKey: ["postPurchase"],
    mutationFn: async (variables: {
      data: Omit<Purchase, "_id">;
      headers: { cvc: string };
    }) => {
      await postRequest<Omit<Purchase, "_id">>(
        `${url}/purchases`,
        variables.data,
        variables.headers
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["purchases"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      setModalDisplay(false);
      setToast(ToastType.SUCCESS, "Products successfully purchased!");
    },

    onError: async (error) => {
      setToast(ToastType.ERROR, error.response?.data?.message!);
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
    const variables = {
      data: {
        user: userQuery?.data?.data._id!,
        totalPrice: totalPrice!,
        totalQuantity: totalQuantity!,
        products: userQuery?.data?.data?.products!,
        status: Status.PENDING,
        cardNumber: userQuery?.data?.data?.paymentMethods
          ?.find((payment) => payment.isDefault)
          ?.number.slice(-4)!,
      },

      headers: {
        cvc: inputValue,
      },
    };

    useAddPurchaseMutation.mutate(variables);
  };

  useEffect(() => {
    if (totalQuantity === 0) {
      navigate("/home");
    }
  }, [totalQuantity]);

  const isNumber = /^[0-9]*$/;
  const inputNotValidLength =
    inputValue.length !== 3 && inputValue.length !== 4;

  return (
    <div className="w-full flex flex-col gap-5 justify-center py-10 lg:items-center">
      {modalDisplay && (
        <Modal>
          {useAddPurchaseMutation.isPending ? (
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
              <input
                type="text"
                className="bg-gray-900 px-2 text-white border-[1px] border-solid border-gray-300 rounded mb-4 mt-4"
                onChange={(e) => {
                  if (
                    isNumber.test(e.target.value) &&
                    e.target.value.length < 5
                  ) {
                    setInputValue(e.target.value);
                  }
                }}
                value={inputValue}
              />
              {inputNotValidLength && (
                <p className="text-red-600 text-sm">
                  CVV must have 3 or 4 characters
                </p>
              )}
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
                  disabled={inputNotValidLength}
                />
              </div>
            </>
          )}
        </Modal>
      )}
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
          onClick={() => {
            if (!userPaymentMethods?.length) {
              navigate("/payment");
            } else {
              setModalDisplay(true);
            }
          }}
          text="Buy"
        />
      </div>
    </div>
  );
}

export default Shopping;
