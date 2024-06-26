import { useEffect, useState } from "react";
import { useUser } from "../../../services/user/query";
import PaymentInput from "./PaymentInput";
import { isCardExpired } from "../../../helpers/date";
import Button, { ButtonVariant } from "../../assets/Button";
import {
  useDeletePaymentMethodMutation,
  useSetToDefaultPaymentMethodMutation,
} from "../../../services/user/mutation";
import { TrashIcon } from "@heroicons/react/20/solid";
import Modal from "../../assets/Modal";
import { useToastStore } from "../../../zustand/store";
import { ToastType } from "../../../zustand/types";

function Payment() {
  const userQuery = useUser();
  const userId = userQuery?.data?.data?._id;
  const [paymentInputs, setPaymentInputs] = useState<JSX.Element[]>([]);
  const [modalNumber, setModalNumber] = useState("");
  const { setToast } = useToastStore((state) => state);

  const setToDefaultPaymentMethodMutation =
    useSetToDefaultPaymentMethodMutation();

  const deletePaymentMethod = useDeletePaymentMethodMutation();

  const paymentMethods = userQuery?.data?.data?.paymentMethods;

  const deletePaymentInput = (id: string) => {
    setPaymentInputs((currentPaymentInputs) => {
      return currentPaymentInputs.filter((paymentElement) => {
        return paymentElement.key !== id;
      });
    });
  };

  const handleClick = () => {
    const id = crypto.randomUUID();

    setPaymentInputs([
      ...paymentInputs,
      <PaymentInput
        userId={userId!}
        paymentsLength={!!paymentMethods?.length}
        key={id}
        deletePaymentInput={deletePaymentInput}
        id={id}
      />,
    ]);
  };

  useEffect(() => {
    if (setToDefaultPaymentMethodMutation.isPending) {
      setToast(ToastType.INFO, "Loading...");
    }
  }, [setToDefaultPaymentMethodMutation.isPending]);

  useEffect(() => {
    if (deletePaymentMethod.isPending) {
      setToast(ToastType.INFO, "Loading...");
    }
  }, [deletePaymentMethod.isPending]);

  return (
    <>
      {!!modalNumber.length && (
        <Modal>
          <h1 className="text-white mb-4">¿Delete payment method?</h1>
          <div className="flex gap-3 self-end">
            <Button
              variant={ButtonVariant.PRIMARY}
              onClick={() => setModalNumber("")}
              disabled={deletePaymentMethod.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                const res = await deletePaymentMethod.mutateAsync({
                  _id: userId!,
                  body: { number: modalNumber },
                });
                if (res.status < 400) {
                  setModalNumber("");
                }
              }}
              disabled={deletePaymentMethod.isPending}
              variant={ButtonVariant.BLACK}
            >
              Confirm
            </Button>
          </div>
        </Modal>
      )}
      <div className="flex flex-col md:flex-row md:items-start gap-10 p-3">
        <div className="overflow-x-auto">
          <table className="min-w-fit bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase">
                  Card number
                </th>
                <th className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase">
                  Expiry Date
                </th>
                <th className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase"></th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {userQuery?.isLoading ? (
                <p>Loading...</p>
              ) : userQuery?.isError ? (
                <p>{userQuery?.error.message}</p>
              ) : !paymentMethods?.length ? (
                <p>There are not payment methods yet</p>
              ) : (
                paymentMethods?.map((paymentMethod, index) => (
                  <tr key={index} className="border-b">
                    <td
                      className={`${
                        isCardExpired(paymentMethod.expiryDate)
                          ? "text-red-600"
                          : "text-black"
                      } py-4 px-6`}
                    >
                      **** **** **** {paymentMethod.number.slice(-4)}
                    </td>
                    <td
                      className={`${
                        isCardExpired(paymentMethod.expiryDate)
                          ? "text-red-600"
                          : "text-black"
                      } py-4 px-6`}
                    >
                      {paymentMethod.expiryDate}
                      {isCardExpired(paymentMethod.expiryDate) && (
                        <p className="text-[11px]">Expired</p>
                      )}
                    </td>
                    <td className="py-4 px-6 flex gap-6 items-center">
                      <div>
                        {paymentMethod.isDefault && (
                          <p className="text-sm text-green-600">Default</p>
                        )}
                        <Button
                          disabled={paymentMethod.isDefault}
                          variant={
                            paymentMethod.isDefault
                              ? ButtonVariant.DISABLED
                              : ButtonVariant.PRIMARY
                          }
                          onClick={() => {
                            setToDefaultPaymentMethodMutation.mutate({
                              _id: userId!,
                              body: {
                                number: paymentMethod.number,
                                expiryDate: paymentMethod.expiryDate,
                              },
                            });
                          }}
                        >
                          <p className="text-white text-sm">Set as default</p>
                        </Button>
                      </div>
                      <button
                        className="w-4 h-min"
                        onClick={() => setModalNumber(paymentMethod.number)}
                        disabled={
                          paymentMethod.isDefault && paymentMethods.length !== 1
                        }
                      >
                        <TrashIcon
                          className={`${
                            paymentMethod.isDefault &&
                            paymentMethods.length !== 1
                              ? "text-gray-300"
                              : "text-gray-600"
                          }  w-4`}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div>
          <Button variant={ButtonVariant.WHITE} onClick={handleClick}>
            Add payment method
          </Button>
          <div className="mt-4 ">
            {paymentInputs.map((PaymentInput) => {
              return PaymentInput;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
