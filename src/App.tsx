import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/assets/Navbar";
import RedirectToHome from "./components/redirect";
import Modal from "./components/assets/Modal";
import { useUserStore } from "./zustand/store";
import { useEffect, useState } from "react";
import { useUser } from "./services/user/query";
import ProductsContainer from "./components/pages/Products";
import ProductPage from "./components/pages/Products/Product";
import Shopping from "./components/pages/Shopping";

function App() {
  const name = localStorage.getItem("name");
  const userStore = useUserStore((state) => state);
  const userQuery = useUser(name!);

  useEffect(() => {
    if (name && userQuery.isSuccess) {
      userStore.setUser(userQuery?.data?.data);
    }
  }, [name, userQuery.dataUpdatedAt]);

  return (
    <>
      {!name?.length && <Modal />}
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
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/shopping" element={<Shopping />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
