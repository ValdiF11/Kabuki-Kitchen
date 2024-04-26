function About() {
  return (
    <>
      ;
      <section id="aboutUs">
        <div className="container-fluid ">
          <div className="card bg-dark">
            <div className="row">
              <div className="col-lg-6">
                <div className="about-left full-height" style={{ paddingBottom: 10, paddingTop: 10 }}>
                  <div className="about-img ms-2">
                    <img
                      src="https://slidesigma.com/themes/html/fattsushi/assets/images/banner-drink.jpg"
                      className="about-img-first object-fit-cover"
                      alt="img"
                      style={{ width: "100%", height: "60vh" }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 align-self-center">
                <div className="about-right">
                  <div className="section-header left-side">
                    <div className="section-heading">
                      <h3 className="fw-700 text-white pb-4">The Story About Kabuki Kitchen</h3>
                    </div>
                  </div>
                  <div className="about-desc">
                    <p className="text-white">
                      Indulge in the exquisite flavors of Japan at Kabuki Kitchen, where each dish is a testament to the artistry of Japanese culinary
                      craftsmanship. From authentic sushi rolls meticulously prepared by our master chefs to steaming bowls of signature ramen, every
                      bite at Kabuki Kitchen is a journey through the vibrant tastes of Japan. Step into our elegant restaurant, where the ambiance
                      transports you to the bustling streets of Tokyo, and our attentive staff ensures your dining experience is nothing short of
                      exceptional.
                    </p>
                    <p className="text-white">
                      Whether youre seeking an intimate dinner for two or a lively gathering with friends, Kabuki Kitchen invites you to savor the
                      rich traditions of Japanese cuisine. With its warm atmosphere, impeccable service, and unparalleled menu selection, our
                      restaurant sets the stage for an unforgettable culinary adventure. Reserve your table today and discover the timeless flavors of
                      Japan at Kabuki Kitchen.
                    </p>
                    <ul className="custom-flex mb-xl-20 row">
                      <li className="col-auto">
                        <i className="fal fa-phone-alt text-white" />
                        <div className="content">
                          <h6 className="fs-18 mb-1 text-white">Phone:</h6>
                          <p className="text-white">(+ 347) 123 4567 890</p>
                        </div>
                      </li>
                      <li className="col-auto">
                        <i className="fal fa-envelope text-white" />
                        <div className="content">
                          <h6 className="fs-18 mb-1 text-white">Email:</h6>
                          <p className="text-white">Kabuki@KKitchen.com</p>
                        </div>
                      </li>
                      <li className="col-auto">
                        <i className="fal fa-map-marker-alt text-white" />
                        <div className="content">
                          <h6 className="fs-18 mb-1 text-white">Location:</h6>
                          <p className="text-white">View Map</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      ;
    </>
  );
}

export default About;
