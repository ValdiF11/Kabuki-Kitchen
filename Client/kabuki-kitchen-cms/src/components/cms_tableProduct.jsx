import Swal from "sweetalert2";
import axios from "axios";
import Loader from "./cms_preloader.jsx";
import { Link } from "react-router-dom";

function Table({ index, cuisine, fetchCuisine }) {
  async function handleDelete() {
    try {
      const response = await axios({
        method: "DELETE",
        url: import.meta.env.VITE_API_URL + `/cuisines/${cuisine.id}`,
        headers: {
          Authorization: `Bearer ${localStorage.acces_token}`,
        },
      });
      fetchCuisine();
    } catch (error) {
      Swal.fire({
        title: `Error!`,
        text: errMsg,
        icon: `error`,
      });
    }
  }

  return (
    <>
      <tr>
        <td scope="row">{index}</td>
        <td className="fw-bold">{cuisine.name}</td>
        <td>
          <img src={cuisine.imgUrl} className="img-fluid" />
        </td>
        <td>{cuisine.description}</td>
        <td className="fw-bold">{cuisine.price}</td>
        <td>{cuisine.User.username}</td>
        <td>
          <span className="d-flex">
            <a type="button" className="ms-3" onClick={handleDelete}>
              <span className="icon material-symbols-outlined text-danger">delete</span>
            </a>
            <Link to={`/edit-product/${cuisine.id}`} type="button" className="ms-3">
              <span className="icon material-symbols-outlined text-danger">edit</span>
            </Link>
            <Link to={`/edit-image/${cuisine.id}`} type="button" className="ms-3">
              <span className="icon material-symbols-outlined text-danger">image</span>
            </Link>
          </span>
        </td>
      </tr>
    </>
  );
}

export default Table;
