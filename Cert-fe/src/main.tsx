import React from "react";
import ReactDOM from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import ErrorComponent from "./shared/Components/ErrorComponent";
import NavHeader from "./shared/Components/NavHeader";

import HomePage from "./Pages/HomePage";
import CreateRequestPage from "./Pages/CreateRequestPage";
import AllRequestsPage from "./Pages/AllRequestsPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import store from "./store";

const Layout = () => {
  return (
    <>
      <NavHeader />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/createRequest",
        element: <CreateRequestPage />,
      },
      {
        path: "/allRequests",
        element: <AllRequestsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
