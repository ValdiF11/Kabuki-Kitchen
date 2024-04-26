import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/cms_preloader.jsx";

function User() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="new-user-section">
        {loading ? (
          <Loader />
        ) : (
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="pt-3 pb-2 mb-3 border-bottom">
                <form
                  onSubmit={async function addUser(event) {
                    event.preventDefault();
                    try {
                      // 1. request ke server
                      setLoading(true);
                      const response = await axios({
                        method: "POST",
                        url: import.meta.env.VITE_API_URL + "/add-user",
                        headers: {
                          Authorization: `Bearer ${localStorage.acces_token}`,
                        },
                        data: {
                          email: email,
                          password: password,
                          phoneNumber: phoneNumber,
                          address: address,
                          username: username,
                        },
                      });
                      Swal.fire({
                        title: `Success!`,
                        text: "Succes Add User",
                        icon: `success`,
                      });
                      setLoading(false);
                      navigate("/");
                    } catch (error) {
                      setLoading(false);
                      const errMsg = error.response.data.message;
                      Swal.fire({
                        title: `Error!`,
                        text: errMsg,
                        icon: `error`,
                      });
                    }
                  }}
                  id="register-form"
                >
                  <h1 className="h3 mb-3 display-1">Register User</h1>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="register-username">Username</label>
                      <label className="text-danger text-end fw-bold">*</label>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="register-username"
                      placeholder="Enter username ..."
                      autoComplete="off"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                    />
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="register-email">Email</label>
                      <label className="text-danger text-end fw-bold">*</label>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      id="register-email"
                      placeholder="Enter email address ..."
                      autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="register-password">Password</label>
                      <label className="text-danger text-end fw-bold">*</label>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      id="register-password"
                      placeholder="Enter password ..."
                      autoComplete="off"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="register-phone">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="register-phone"
                      placeholder="Enter phone number (optional) ..."
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      value={phoneNumber}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="register-address">Address</label>
                    <textarea
                      id="register-address"
                      className="form-control"
                      rows={3}
                      placeholder="Enter address (optional) ..."
                      autoComplete="off"
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                    />
                  </div>
                  <button className="btn btn-lg btn-primary rounded-pill w-100 p-2 mt-3" type="submit">
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default User;
