import axios from "axios";
import { useEffect } from "react";

function App() {
  const url = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return <></>;
}

export default App;
