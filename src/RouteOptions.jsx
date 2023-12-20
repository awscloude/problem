import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Signup from "./components/Signup/Signup.jsx";
import { useSelector } from "react-redux";


const RouteOptions = () => {
  const authStatus = useSelector((state) => state.reducer.auth.status);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Signup />} />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default RouteOptions;
