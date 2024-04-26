import { HashLink } from "react-router-hash-link";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-black text-white">
        <div className="container-fluid py-0">
          <img src="logo kabuki.png" className="img-fluid" alt="" style={{ width: 50 }} />
          <HashLink to={"/#"} className="navbar-brand text-white" style={{ padding: 20 }}>
            <h4> Kabuki Kitchen </h4>
          </HashLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* Added ms-auto class */}
              <li className="nav-item px-3">
                <HashLink smooth to={"/#menu"} className="nav-link text-white">
                  Menu
                </HashLink>
              </li>
              <li className="nav-item px-3">
                <HashLink smooth to={"/#aboutUs"} className="nav-link text-white">
                  About Us
                </HashLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
