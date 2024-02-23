import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/assets/Navbar";
import ProductsContainer from "./components/pages/ProductsContainer";
import RedirectToHome from "./components/redirect";
import ProductPage from "./components/pages/Product";

function App() {
  return (
    <div className="font-sans h-full w-full">
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
