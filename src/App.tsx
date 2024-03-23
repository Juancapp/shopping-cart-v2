import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/assets/Navbar";
import RedirectToHome from "./components/redirect";
import Modal from "./components/assets/Modal";

import Shopping from "./components/pages/Shopping";
import ProductsContainer from "./components/pages/Home";
import { useEffect, useState } from "react";
import Button from "./components/assets/Button";
import { useToastStore } from "./zustand/store";
import Toast from "./components/assets/Toast";
import Purchases from "./components/pages/Purchases";
import { FirstTime } from "./types";
import ProfilePicture from "./components/assets/ProfilePicture";
import { useUser } from "./services/user/query";
import Product from "./components/pages/Home/Product";
import { ToastType } from "./zustand/types";
import Payment from "./components/pages/Payment";
import { isCardExpired } from "./helpers/date";

function App() {
  const name = localStorage.getItem("name");
  const [inputValue, setInputValue] = useState("");
  const { text } = useToastStore((state) => state);
  const userQuery = useUser();
  const firstTime = userQuery?.data?.data?.firstTime;
  const paymentIsExpired = userQuery?.data?.data?.paymentMethods.some(
    (paymentMethod) => isCardExpired(paymentMethod.expiryDate)
  );

  const { setToast } = useToastStore((state) => state);

  useEffect(() => {
    if (userQuery?.isError) {
      setToast(ToastType.ERROR, userQuery?.error.message);
    }
  }, [userQuery?.dataUpdatedAt]);

  const regExp = /^[a-zA-Z]+$/;

  return (
    <div className="h-full">
      {!name?.length ? (
        <Modal>
          <h1 className="text-2xl text-white font-bold">User</h1>
          <p className="italic text-white text-sm mt-2">
            Log in with your nickname. If you don't have one, choose one and the
            app will create it automatically. Remember that the products in the
            cart, your purchases and profile picture are stored for each user.
            Take advantage of the features!
          </p>
          <form
            action=""
            onSubmit={(event) => {
              event?.preventDefault();
              localStorage.setItem("name", inputValue);
              window.location.reload();
            }}
          >
            <input
              type="text"
              className="bg-gray-900 px-2 text-white border-[1px] border-solid border-gray-300 rounded mb-4 mt-4"
              onChange={(e) => setInputValue(e.target.value)}
            />
            {(inputValue.length < 3 || !regExp.test(inputValue)) && (
              <p className="text-red-800 text-sm">
                User must have 3 or more characters and all characters must be
                letters
              </p>
            )}
            <Button
              type="submit"
              text="Confirm"
              disabled={inputValue.length < 3 || !regExp.test(inputValue)}
            />
          </form>
        </Modal>
      ) : (
        firstTime === FirstTime.TRUE && <ProfilePicture />
      )}
      <div
        className={`font-sans h-full w-full ${
          !name?.length && "blur-sm overflow-y-hidden"
        }`}
      >
        <BrowserRouter>
          <Navbar paymentIsExpired={paymentIsExpired!} />
          <Routes>
            <Route path="/" element={<RedirectToHome />} />
            <Route path="/home" element={<ProductsContainer />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/payment" element={<Payment />} />
            <Route
              path="/documentation"
              element={<h1>Documentation (work in progress)</h1>}
            />
          </Routes>
        </BrowserRouter>
      </div>
      {!!text.length && <Toast text={text} />}
    </div>
  );
}

export default App;
