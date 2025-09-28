// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom"; // use HashRouter for GitHub Pages
import { AppWrapper } from "./AppWrapper";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <AppWrapper />
    </HashRouter>
  </React.StrictMode>
);
