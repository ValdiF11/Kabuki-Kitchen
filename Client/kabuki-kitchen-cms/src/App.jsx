import { redirect, createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import User from "./pages/addUserCMS";
import Home from "./pages/homeCMS";
import Category from "./pages/categoryCMS";
import "./style.css";
import Login from "./pages/loginCMS";
import Image from "./pages/addImageCMS";
import FormProduct from "./pages/resuableFormCMS";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    loader: () => {
      if (!localStorage.acces_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/addUser",
        element: <User />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/add-product",
        element: <FormProduct />,
      },
      {
        path: "/edit-product/:id",
        element: <FormProduct />,
      },
      {
        path: "/edit-image/:id",
        element: <Image />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
