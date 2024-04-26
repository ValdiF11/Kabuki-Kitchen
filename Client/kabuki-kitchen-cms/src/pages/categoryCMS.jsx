import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/cms_preloader.jsx";
import TableCategory from "../components/cms_tableCategory.jsx";

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const response = await axios({
          method: "GET",
          url: import.meta.env.VITE_API_URL + "/categories",
          headers: {
            Authorization: `Bearer ${localStorage.acces_token}`,
          },
        });
        setCategories(response.data);
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

    fetchCategory();
  }, []);

  return (
    <>
      <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="category-section">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="display-2">Categories</h1>
        </div>
        <div className="row">
          <div className="col-12">
            {loading ? (
              <Loader />
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                  </tr>
                </thead>
                <tbody id="table-category">
                  {categories.map((el, index) => {
                    return <TableCategory key={el.id} index={index + 1} category={el} />;
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

export default Category;
