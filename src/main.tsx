import React from "react";
import ReactDOM from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import ErrorComponent from "./Components/ErrorComponent";
import NavHeader from "./Components/NavHeader";

import HomePage from "./Pages/HomePage";
import CreateRequestPage from "./Pages/CreateRequestPage";
import AllRequestsPage from "./Pages/AllRequestsPage";

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
    <RouterProvider router={router} />
  </React.StrictMode>
);
