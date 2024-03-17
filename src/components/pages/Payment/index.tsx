import { usePaymentInputs, PaymentInputsWrapper } from "react-payment-inputs";
import { SetStateAction, useState } from "react";
import ERROR_MESSAGES from "./constants";
import images, { CardImages } from "react-payment-inputs/images";
import Button from "../../assets/Button";

const myImages: CardImages = images as unknown as CardImages;

export default function Payment() {
  const {
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    wrapperProps,
    getCardImageProps,
  } = usePaymentInputs({ errorMessages: ERROR_MESSAGES });

  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCVC] = useState("");

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

  const handleSubmit = () => {
    const data = {
      number: cardNumber,
      expiryDate: expiryDate,
      cvc: cvc,
    };

    console.log(data);
  };

  return (
    <div>
      <PaymentInputsWrapper {...wrapperProps}>
        <svg {...getCardImageProps({ images: myImages })} />
        <input
          {...getCardNumberProps({ onChange: handleChangeCardNumber })}
          value={cardNumber}
        />
        <input
          {...getExpiryDateProps({ onChange: handleChangeExpiryDate })}
          value={expiryDate}
        />
        <input {...getCVCProps({ onChange: handleChangeCVC })} value={cvc} />
      </PaymentInputsWrapper>
      <Button text="Add" onClick={handleSubmit} />
    </div>
  );
}
