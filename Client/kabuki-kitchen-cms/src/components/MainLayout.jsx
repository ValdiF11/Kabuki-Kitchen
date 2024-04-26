import { Outlet } from "react-router-dom";
import Navbar from "./cms_navbar";
import Sidebar from "./cms_sidebar";

export default function MainLayout(params) {
  return (
    <>
      <Navbar />
      <section className="container-fluid" id="home-section">
        <div className="row">
          <div>
            <Sidebar />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
}
