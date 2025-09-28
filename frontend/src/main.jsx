import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // or HashRouter if you use that
import AppWrapper from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/gachapon"> 
      <AppWrapper />
    </BrowserRouter>
  </React.StrictMode>
);
