import { Navbar } from "../../components/navbar/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../home/Home";
import { Login } from "../login/Login";
import { SignUp } from "../signUp/SignUp";
import { Profile } from "../profile/Profile";
import styles from "./App.module.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

export const App = () => {
  return (
    <div className={styles.container}>
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
};
