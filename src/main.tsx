import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import './i18n'; // Hier wird i18n importiert
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
