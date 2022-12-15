import { BrowserRouter } from "react-router-dom";
import "./assets/css/app.css";
import { CustomerContextProvider } from "./contexts/customerContext";
import { GlobalToolsContextProvider } from "./contexts/globalToolsContext";
import { ProductContextProvider } from "./contexts/productContext";
import Routes from "./router";

function App() {
  return (
    <BrowserRouter>
      <GlobalToolsContextProvider>
        <CustomerContextProvider>
          <ProductContextProvider>
            <Routes />
          </ProductContextProvider>
        </CustomerContextProvider>
      </GlobalToolsContextProvider>
    </BrowserRouter>
  );
}

export default App;
