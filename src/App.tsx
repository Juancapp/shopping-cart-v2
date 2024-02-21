import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/assets/Navbar";
import ProductsContainer from "./components/pages/ProductsContainer";

function App() {
  return (
    <div className="w-screen h-screen">
      <BrowserRouter>
        <Navbar />
        <ProductsContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
