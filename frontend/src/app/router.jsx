import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";

import About from "../Pages/About"
import MainLayout from "../layouts/MainLayout";


const router = createBrowserRouter([
  {
    element: <MainLayout />,

    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/signin",
        element: <Signin />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/about",
        element: <About />
      }
    ]
  }
])

export default router