import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "./public_preloader";
import { HashLink } from "react-router-hash-link";

function Menu() {
  const [cuisines, setCuisines] = useState({});
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  async function fetchCuisine() {
    try {
      const response = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_URL + `/pub/cuisines`,
        params: {
          search: search,
          filter: filter,
          sort: sort,
          "page[number]": pageNumber,
          "page[size]": 10,
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

  async function fetchCategory() {
    try {
      const response = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_URL + `/pub/categories`,
      });
      setCategories(response.data);
    } catch (error) {
      const errMsg = error.response.data.message;
      Swal.fire({
        title: `Error!`,
        text: errMsg,
        icon: `error`,
      });
    }
  }

  useEffect(() => {
    fetchCuisine();
  }, [search, filter, sort, pageNumber]);

  useEffect(() => {
    fetchCategory();
    fetchCuisine();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handlePagination = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    setPageNumber(1);
    fetchCuisine();
  };

  const handleCategoryClick = (categoryId) => {
    setFilter(categoryId);
    setPageNumber("1");
  };

  const getPageNumbers = () => {
    const totalPage = cuisines.totalPage;
    return Array.from({ length: totalPage }, (_, index) => index + 1);
  };

  return (
    <>
      <section id="menu">
        <div className="container-fluid" style={{ paddingBottom: "20px" }}>
          <div className="card bg-dark">
            <div className="card-header text-center">
              <h4 className="pb-4 text-white">Our Menu</h4>
            </div>
            <div className="row p-3">
              {loading ? (
                <Loader />
              ) : (
                <>
                  <div className="col-12 d-flex justify-content-between ">
                    <div className="input-group mb-3 " style={{ width: "90%" }}>
                      <input type="text" className="form-control" placeholder="Search..." value={search} onChange={handleSearchChange} />
                      <button className="btn btn-outline-secondary" type="button" onClick={handleSubmitSearch}>
                        Search
                      </button>
                    </div>
                    <div className="dropdown mb-3 pl-2">
                      <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Sorting
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <button className="dropdown-item" onClick={() => setSort("+")}>
                            Ascending
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item" onClick={() => setSort("-")}>
                            Descending
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-1 border-end">
                    <div className="nav flex-column align-item-centernav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                      <button
                        className="nav-link active my-3"
                        data-bs-toggle="pill"
                        type="button"
                        role="tab"
                        aria-selected="true"
                        onClick={() => handleCategoryClick("")}
                      >
                        All
                      </button>
                      {categories.map((el) => (
                        <Categories key={el.id} categories={el} handleCategoryClick={handleCategoryClick} />
                      ))}
                    </div>
                  </div>
                  <div className="col-md-11">
                    {/* {categories.map((el) => ( */}
                    <Productbox cuisineFetchData={cuisines.data} />
                    {/* ))} */}
                  </div>
                </>
              )}
            </div>
            <div className="card-footer">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                  <li className={`page-item ${pageNumber === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => handlePagination(pageNumber - 1)}>
                      Previous
                    </button>
                  </li>
                  {getPageNumbers().map((page) => (
                    <li key={page} className={`page-item ${pageNumber === page ? "active" : ""}`}>
                      <button className="page-link" onClick={() => handlePagination(page)}>
                        {page}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${pageNumber === cuisines.totalPage ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => handlePagination(pageNumber + 1)}>
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Categories({ categories, handleCategoryClick }) {
  return (
    <button
      className="nav-link active my-3"
      id={`menu-${categories.id}-tab`}
      data-bs-toggle="pill"
      data-bs-target={categories.name}
      type="button"
      role="tab"
      aria-controls={`menu-${categories.id}`}
      aria-selected="true"
      onClick={() => handleCategoryClick(categories.id)}
    >
      {categories.name}
    </button>
  );
}

function Productbox({ cuisineFetchData }) {
  return (
    <div className="tab-pane" role="tabpanel" aria-labelledby="menu2-tab">
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {cuisineFetchData && cuisineFetchData.map((el, index) => <ProductCard key={el.id} index={index + 1} cuisine={el} />)}
      </div>
    </div>
  );
}

function ProductCard({ cuisine }) {
  return (
    <>
      {console.log("test")}
      <div className="col">
        <div className="card h-100">
          <img src={cuisine.imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{cuisine.name}</h5>
            <p className="card-text">Price: {cuisine.price}</p>
          </div>
          <div className="card-footer">
            <HashLink smooth to={`/details/${cuisine.id}#`} className="btn btn-lg btn-primary rounded-pill w-100 p-2">
              View Details
            </HashLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
