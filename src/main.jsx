// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Import Tailwind CSS
import { DetailsProvider } from "./context/detailsProvider";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <DetailsProvider>
      <App />
    </DetailsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
