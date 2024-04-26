import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Loader from "../components/cms_preloader.jsx";
import Table from "../components/cms_tableProduct.jsx";
import { Link } from "react-router-dom";

function Product() {
  const [cuisines, setCuisines] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCuisine() {
    try {
      const response = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_URL + "/cuisines",
        headers: {
          Authorization: `Bearer ${localStorage.acces_token}`,
        },
      });
      setCuisines(response.data);
      setLoading(false);
    } catch (error) {
      const errMsg = error.response.data.message;
      Swal.fire({
        title: `Error!`,
        text: errMsg,
        icon: `error`,
      });
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCuisine();
  }, []);

  return (
    <>
      <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="product-section">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="display-2">Products</h1>
          <Link type="button" to="/add-product" className="btn btn-primary rounded-pill" id="new-product">
            <span className="icon material-symbols-outlined">add</span>New Product
          </Link>
        </div>
        <div className="row">
          <div className="col-12 table-responsive">
            {loading ? (
              <Loader />
            ) : (
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col" width="180px">
                      Image
                    </th>
                    <th scope="col" width="250px">
                      Description
                    </th>
                    <th scope="col">Price</th>
                    <th scope="col">Author</th>
                    <th scope="col" width="50px">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody id="table-product">
                  {cuisines.map((el, index) => {
                    return <Table key={el.id} index={index + 1} cuisine={el} fetchCuisine={fetchCuisine} />;
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Product;
