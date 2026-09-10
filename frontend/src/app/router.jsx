import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../Pages/Home";
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";
import Blogs from "../Pages/Blogs";
import BlogDetails from "../Pages/BlogDetails";
// import UpdateBlog from "../Pages/UpdateBlog";
import CreateBlog from "../Pages/CreateBlog";
import Userdashboard from "../Pages/Userdashboard";
import UserBlogs from "../Pages/UserBlogs";
import ProtectedRoute from "../app/ProtectedRoute";
import Categories from "../Pages/Categories";
import AllUsers from "../admin/pages/AllUsers";
import UpdateBlog from "../Pages/UpdateBlog";
import UpdateUser from "../Pages/UpdateUser";
import About from "../Pages/About";
import AdminRoute from "./AdminRoute";
import AllBlogs from "../admin/pages/AllBlogs";
import AdminDashboard from "../admin/pages/AdminDashboard";

import AllComments from "../admin/pages/Allcomments";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      // Public routes
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },

      // Protected routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/blogs",
            element: <Blogs />,
          },
          {
            path: "/blog/:id",
            element: <BlogDetails />,
          },
          {
            path: "/categories",
            element: <Categories />,
          },

          {
            path: "/updateblog/:id",
            element: <UpdateBlog />,
          },

          // Dashboard + its nested pages
          {
            path: "/userdashboard",
            element: <Userdashboard />,
            children: [
              {
                index: true,
                element: <UpdateUser />,
              },
              {
                path: "profile",
                element: <UpdateUser />,
              },
              {
                path: "createblog",
                element: <CreateBlog />,
              },
              {
                path: "userblogs",
                element: <UserBlogs />,
              },
              {
                path: "updateblog/:id",
                element: <UpdateBlog />,
              },
            ],
          },

          {
            element: <AdminRoute />,
            children: [
              {
                element: <AdminDashboard />,
                path: "/admindashboard",
              },

              {
                element: <AllUsers />,
                path: "/allusers",
              },

              {
                element: <AllBlogs />,
                path: "/allblogs",
              },

              {
                element: <AllComments />,
                path: "/allcomments",
              },
            ],
          },

          // {
          //   path: "/admindashboard",
          //   element: <AdminDashboard />,
          // },
        ],
      },
    ],
  },
]);

export default router;
