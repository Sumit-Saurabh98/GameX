import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "./Redux/store";
import "@fontsource/titillium-web/400.css";
import Theme from "./Components/Theme/Theme";
import { Provider } from "react-redux";
import FilterContext from "./context/FilterContext";
import AuthContextProvider from "./context/AuthContextprovider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
  <FilterContext>
  <Provider store={store}>
    <BrowserRouter>
      <ChakraProvider theme={Theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </Provider>
  </FilterContext>
  </AuthContextProvider>
);
