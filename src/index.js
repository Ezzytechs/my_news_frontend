import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(app);
