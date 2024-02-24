import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/assets/Navbar";
import ProductsContainer from "./components/pages/ProductsContainer";
import RedirectToHome from "./components/redirect";
import ProductPage from "./components/pages/ProductsContainer/Product";
import Modal from "./components/assets/Modal";
import { useUserStore } from "./zustand/store";
import { useEffect, useState } from "react";
import { useUser } from "./services/user/query";

function App() {
  const name = localStorage.getItem("name");
  const userStore = useUserStore((state) => state);
  const userQuery = useUser(name!);
  const [reRender, setReRender] = useState<boolean>(false);

  useEffect(() => {
    if (name && userQuery.isSuccess) {
      userStore.setUser(userQuery?.data?.data);
    }

    if (!name) {
      userStore.setUser({});
    }
  }, [name, userQuery.dataUpdatedAt]);

  return (
    <>
      {!("_id" in userStore.user) && (
        <Modal handleClick={() => setReRender(!reRender)} />
      )}
      <div
        className={`font-sans h-full w-full ${
          !("_id" in userStore.user) && "blur-sm overflow-y-hidden"
        }`}
      >
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/home" element={<ProductsContainer />} />
            <Route path="/" element={<RedirectToHome />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
