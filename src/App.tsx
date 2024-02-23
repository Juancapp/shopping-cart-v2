import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/assets/Navbar";
import ProductsContainer from "./components/pages/ProductsContainer";
import RedirectToHome from "./components/redirect";
import ProductPage from "./components/pages/Product";
import Modal from "./components/assets/Modal";
import { useUserStore } from "./zustand/store";
import { useEffect } from "react";
import { useUser } from "./services/user/query";

function App() {
  const name = localStorage.getItem("name");
  const userStore = useUserStore((state) => state);
  const userQuery = useUser(name!);

  useEffect(() => {
    if (name) {
      if (userQuery.isSuccess) {
        userStore.setUser(userQuery?.data?.data);
      }
    }
  }, [name]);

  return (
    <div className="font-sans h-full w-full">
      <Modal />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/home" element={<ProductsContainer />} />
          <Route path="/" element={<RedirectToHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
