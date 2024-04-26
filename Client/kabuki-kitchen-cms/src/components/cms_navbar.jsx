function Navbar() {
  return (
    <>
      <header className="navbar sticky-top bg-white flex-md-nowrap p-0 shadow" id="navbar">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6">
          {" "}
          <img src="logo kabuki.png" width={40} className="d-inline-block me-2" alt="IDEA" />
          Admin Panel
        </a>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebar-menu"
          aria-controls="sidebar-menu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
      </header>
    </>
  );
}

export default Navbar;
