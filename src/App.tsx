import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/app.css";
import { AccessContextProvider } from "./contexts/accessConextex";
import { CustomerContextProvider } from "./contexts/customerContext";
import { GlobalToolsContextProvider } from "./contexts/globalToolsContext";
import { ProductContextProvider } from "./contexts/productContext";
import Routes from "./router";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <AccessContextProvider>
          <GlobalToolsContextProvider>
            <CustomerContextProvider>
              <ProductContextProvider>
                <Routes />
              </ProductContextProvider>
            </CustomerContextProvider>
          </GlobalToolsContextProvider>
        </AccessContextProvider>
      </BrowserRouter>
    </DndProvider>
  );
}

export default App;
