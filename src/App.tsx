import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/assets/Navbar";
import RedirectToHome from "./components/redirect";
import Modal from "./components/assets/Modal";

import Shopping from "./components/pages/Shopping";
import ProductsContainer from "./components/pages/Home";
import Home from "./components/pages/Home/";
import { useState } from "react";
import Button from "./components/assets/Button";
import { useToastStore } from "./zustand/store";
import Toast from "./components/assets/Toast";

function App() {
  const name = localStorage.getItem("name");
  const [inputValue, setInputValue] = useState("");
  const { text } = useToastStore((state) => state);

  return (
    <>
      {!name?.length && (
        <Modal>
          <h1 className="text-2xl text-white font-bold">User</h1>
          <p className="italic text-white text-sm mt-2">
            Log in with your nickname. If you don't have one, choose one and the
            app will create it automatically. Remember that the products in the
            cart, your purchases and profile picture are stored for each user.
            Take advantage of the features!
          </p>
          <input
            type="text"
            className="bg-gray-900 px-2 text-white border-[1px] border-solid border-gray-300 rounded mb-4 mt-4"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            text="Confirm"
            onClick={() => {
              localStorage.setItem("name", inputValue);
              window.location.reload();
            }}
          />
        </Modal>
      )}
      <div
        className={`font-sans h-full w-full ${
          !name?.length && "blur-sm overflow-y-hidden"
        }`}
      >
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<RedirectToHome />} />
            <Route path="/home" element={<ProductsContainer />} />
            <Route path="/product/:id" element={<Home />} />
            <Route path="/shopping" element={<Shopping />} />
          </Routes>
        </BrowserRouter>
      </div>
      {!!text.length && <Toast text={text} />}
    </>
  );
}

export default App;
