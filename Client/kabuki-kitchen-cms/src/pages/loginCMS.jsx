import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  // bikin state untuk masing masing input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <section className="container" id="login-section">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="mb-3 mt-5">Login Options</h1>
            <span>For all kabuki kitchen admin, please login to manage system.</span>
          </div>
          <div className="col-12 col-lg-8 offset-lg-2 my-5">
            <div className="row">
              <div className="col-12 col-md-6 border-end p-5 text-left">
                <img src="logo kabuki.png" width="200px" alt="sofa" />
              </div>
              <div className="col-12 col-md-6 p-5 text-left">
                <div className="form-signin m-auto">
                  <form
                    onSubmit={async function formOnSubmit(event) {
                      event.preventDefault();
                      try {
                        // 1. request ke server
                        const response = await axios({
                          method: "POST",
                          url: import.meta.env.VITE_API_URL + "/login",
                          data: {
                            email: email,
                            password: password,
                          },
                        });
                        console.log(response);
                        // 2. save token ke local
                        localStorage.acces_token = response.data.acces_token;
                        // 3. redirect
                        navigate("/");
                      } catch (error) {
                        const errMsg = error.response.data.message;
                        Swal.fire({
                          title: `Error!`,
                          text: errMsg,
                          icon: `error`,
                        });
                      }
                    }}
                    id="login-form"
                  >
                    <h1 className="h3 mb-3 display-1">Log in to your account</h1>
                    <div className="mb-3 mt-3">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="login-email">Email</label>
                        <label className="text-danger text-end fw-bold">*</label>
                      </div>
                      <input
                        type="email"
                        className="form-control"
                        id="login-email"
                        placeholder="Enter email address ..."
                        autoComplete="off"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                    <div className="mb-4">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="login-password">Password</label>
                        <label className="text-danger text-end fw-bold">*</label>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        id="login-password"
                        placeholder="Enter your password ..."
                        autoComplete="off"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>
                    <div className="checkbox mb-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" defaultValue="" id="login-remember" />
                        <label className="form-check-label" htmlFor="login-remember">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <button className="btn btn-lg btn-primary rounded-pill w-100 p-2" type="submit">
                      Log In
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
