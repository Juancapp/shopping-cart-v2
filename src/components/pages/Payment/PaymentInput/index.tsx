import { usePaymentInputs, PaymentInputsWrapper } from "react-payment-inputs";
import { SetStateAction, useMemo, useState } from "react";
import images, { CardImages } from "react-payment-inputs/images";
import ERROR_MESSAGES from "../constants";
import Button from "../../../assets/Button";
import { useAddPurchaseMethodMutation } from "../../../../services/user/mutation";
import { XMarkIcon } from "@heroicons/react/24/outline";

const myImages: CardImages = images as unknown as CardImages;

function PaymentInput({
  userId,
  paymentsLength,
  id,
  deletePaymentInput,
}: {
  userId: string;
  paymentsLength: boolean;
  id: string;
  deletePaymentInput: (arg0: string) => void;
}) {
  const {
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    wrapperProps,
    getCardImageProps,
    meta,
  } = usePaymentInputs({ errorMessages: ERROR_MESSAGES });

  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCVC] = useState("");
  const [isDefault, setIsDefault] = useState(!paymentsLength);

  const addPurchaseMutation = useAddPurchaseMethodMutation();

  const handleChangeCardNumber = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setCardNumber(event.target.value);
  };

  const handleChangeExpiryDate = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setExpiryDate(event.target.value);
  };

  const handleChangeCVC = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setCVC(event.target.value);
  };

  const handleSubmit = async () => {
    const data = {
      number: cardNumber,
      expiryDate: expiryDate.replace(/ /g, ""),
      cvc: cvc,
      isDefault: isDefault,
    };

    const res = await addPurchaseMutation.mutateAsync({
      _id: userId,
      body: data,
    });

    if (res.status < 400) {
      deletePaymentInput(id);
    }
  };

  const creditCardNumbers = [
    "4032033939752890",
    "5110925132447578",
    "5110924884979128",
    "376111376205440",
    "349665599374055",
    "4032031813624607",
    "4032036425935002",
    "6011515715729746",
    "6011328907040538",
    "5893519184972857",
    "3538534151810655",
    "3538534151810655",
    "3538534151810655",
    "3538534151810655",
  ];

  const creditNumber = useMemo(
    () =>
      creditCardNumbers[Math.floor(Math.random() * creditCardNumbers.length)],
    []
  );

  return (
    <div className="flex flex-col w-full md:flex-1 mb-10 shadow-md p-3">
      <XMarkIcon
        onClick={() => deletePaymentInput(id)}
        className="w-5 cursor-pointer self-end"
      />
      <h1 className="text-red-500 mb-4 text-sm">
        <p className="font-bold inline-block mr-2">Caution: </p>
        Do not use a real credit card number. Instead, copy and paste suggested
        card number below the input
      </h1>
      <div className="flex flex-col items-start md:flex-row md:justify-between gap-3">
        <div className="flex flex-col">
          <PaymentInputsWrapper {...wrapperProps}>
            <svg {...getCardImageProps({ images: myImages })} />
            <input
              {...getCardNumberProps({ onChange: handleChangeCardNumber })}
              value={cardNumber}
              id={"cardNumber"}
            />
            <input
              {...getExpiryDateProps({ onChange: handleChangeExpiryDate })}
              value={expiryDate}
            />
            <input
              {...getCVCProps({ onChange: handleChangeCVC })}
              value={cvc}
            />
          </PaymentInputsWrapper>
          <p className="text-blue-800 text-[12px] inline-block">
            {creditNumber}
          </p>
        </div>
        {paymentsLength && (
          <label>
            <input
              type="checkbox"
              checked={isDefault}
              onChange={() => setIsDefault((prevValue) => !prevValue)}
            />
            Set as default
          </label>
        )}
        <Button text="Add" onClick={handleSubmit} disabled={!!meta.error} />
      </div>
    </div>
  );
}

export default PaymentInput;
