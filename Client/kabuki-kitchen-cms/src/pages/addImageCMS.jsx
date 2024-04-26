import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/cms_reusableButton";

function Image() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleCancel = () => {
    navigate("/");
  };
  // handle change input image
  const handleChange = (event) => {
    const image = event.target.files[0]; // ambil imagenya dari sini
    setFile(image);
  };
  // handle untuk submit form
  const handleSubmitForm = async (event) => {
    event.preventDefault();
    // ini hanya contoh, nanti jangan lupa pake try catch
    const formData = new FormData(); // buat form data
    formData.append("avatar", file); // append ke formData
    // param ke 1 sesuaikan dengan field input di servernya, param ke 2 dari state "file"
    // axios
    const { data } = await axios({
      method: "PATCH",
      url: import.meta.env.VITE_API_URL + `/cuisines/${id}/coverUrl`,
      headers: {
        Authorization: `Bearer ${localStorage.acces_token}`,
        "Content-Type": "multipart/form-data", // wajib menambahkan line ini pas nge axios
      },
      data: formData,
    });

    // kesananya harusnya lanjut udah tau mau ngapain
    Swal.fire({
      title: `Success!`,
      text: "Succes Add User",
      icon: `success`,
    });
    navigate("/");
  };
  return (
    <>
      <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="update-product-section">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="pt-3 pb-2 mb-3">
              <form onSubmit={handleSubmitForm} id="register-form">
                <h1 className="h3 mb-3 display-1">Update Image</h1>
                {/* <div class="mb-3"> */}
                <div className="input-group mb-3">
                  <input onChange={handleChange} type="file" className="form-control pb-2" id="inputGroupFile02" autoComplete="off" required="" />
                </div>
                <div className="row mt-5 mb-3">
                  <Button />
                </div>
                {/* </div> */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Image;
