import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import "./App.scss";

// const el = document.getElementById("app");

// ReactDOM.render(<App />, el);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";

import App from "./App";

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
