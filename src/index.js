import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { NoteProvider } from "./context/NoteContext";
import { AlertProvider } from "./context/AlertContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AlertProvider>
        <NoteProvider>
          <App />
        </NoteProvider>
      </AlertProvider>
    </BrowserRouter>
  </React.StrictMode>
);
