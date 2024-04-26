import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cuisine, setCuisine] = useState({});

  async function fetchCuisineid() {
    try {
      const response = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_URL + `/pub/cuisines/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.acces_token}`,
        },
      });
      setCuisine(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCuisineid();
  });

  return (
    <>
      ;
      <div className="container" style={{ marginBottom: "15vh" }}>
        <div className="card mb-3" id="details">
          <div className="row g-0">
            <div className="col-md-2">
              <img src={cuisine.imgUrl} className="img-fluid rounded-start w-100" alt="..." />
            </div>
            <div className="col-md-10 align-item-center">
              <div className="card-body">
                <h5 className="card-title">{cuisine.name}</h5>
                <p className="card-text">{cuisine.description}</p>
                <p className="card-text">
                  <strong>{cuisine.price}</strong>
                </p>
                <HashLink smooth to={"/#menu"} class="btn btn-primary">
                  Go Back
                </HashLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
