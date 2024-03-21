import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { mainRoutes } from "./routes/MainRoutes.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(mainRoutes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer className="text-lg" />
    <RouterProvider router={router} />
  </React.StrictMode>
);
