import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/assets/Navbar";

function App() {
  return (
    <div className="w-screen h-screen">
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </div>
  );
}

export default App;
