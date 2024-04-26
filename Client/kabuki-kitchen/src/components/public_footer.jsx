function Footer() {
  return (
    <>
      <footer className="bg-dark text-light py-4 mt-auto">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>Opening Hours</h5>
              <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
              <p>Saturday - Sunday: 10:00 AM - 11:00 PM</p>
            </div>
            <div className="col-md-4">
              <h5>Location</h5>
              <p>123 Main Street, Cityville, State, Zip Code</p>
            </div>
            <div className="col-md-4">
              <img src="Footer.jpeg" alt="Restaurant Exterior" className="img-fluid object-fill" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
