import { Outlet } from "react-router-dom";
import Footer from "./public_footer";
import Navbar from "./public_navbar";
import ToTopButton from "./public_toTop";

export default function MainLayout(params) {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ToTopButton />
    </>
  );
}
