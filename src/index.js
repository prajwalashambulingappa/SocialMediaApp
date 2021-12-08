import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {AppAuthContextProvider} from "./context/app-auth-context";
ReactDOM.render(
  <AppAuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppAuthContextProvider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
