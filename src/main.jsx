import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/tailwind.css";
import "./styles/base.css";
import "./styles/cursor.css";
import "./styles/shell.css";
import "./styles/learning.css";
import "./styles/dialogs.css";
import "./styles/navigator.css";
import "./styles/simulation.css";
import "./styles/animations.css";
import "./styles/responsive.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
