import Dropdown from "../components/cms_dropdownCategories";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/cms_reusableButton";
import Loader from "../components/cms_preloader.jsx";

function FormProduct() {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

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
    } catch (error) {
      const errMsg = error.response.data.message;
      Swal.fire({
        title: `Error!`,
        text: errMsg,
        icon: `error`,
      });
    }
  }

  if (id) {
    const [cuisine, setCuisine] = useState({});
    async function fetchCuisineid() {
      try {
        const response = await axios({
          method: "GET",
          url: import.meta.env.VITE_API_URL + `/cuisines/${id}`,
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
      const fetchData = async () => {
        await fetchCategory();
        const cuisineData = await fetchCuisineid();
        console.log(cuisineData);
        setName(cuisineData.name);
        setCategoryId(cuisineData.categoryId);
        setDescription(cuisineData.description);
        setPrice(cuisineData.price);
        setImgUrl(cuisineData.imgUrl);
      };

      fetchData();
    }, []);
  } else {
    useEffect(() => {
      const fetchData = async () => {
        await fetchCategory();
      };

      fetchData();
    }, []);
  }

  return (
    <>
      <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="new-product-section">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="display-2">{!id ? `New Product` : `Update Product`}</h1>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <form
                  onSubmit={async function editProduct(event) {
                    event.preventDefault();
                    if (id) {
                      try {
                        // 1. request ke server
                        const response = await axios({
                          method: "PUT",
                          url: import.meta.env.VITE_API_URL + "/cuisines/" + id,
                          headers: {
                            Authorization: `Bearer ${localStorage.acces_token}`,
                          },
                          data: {
                            name: name,
                            description: description,
                            price: price,
                            imgUrl: imgUrl,
                            categoryId: categoryId,
                          },
                        });
                        Swal.fire({
                          title: `Success!`,
                          text: "Succes Edit data",
                          icon: `success`,
                        });
                        navigate("/");
                      } catch (error) {
                        const errMsg = error.response.data.message;
                        Swal.fire({
                          title: `Error!`,
                          text: errMsg,
                          icon: `error`,
                        });
                      }
                    } else {
                      try {
                        // 1. request ke server
                        const response = await axios({
                          method: "POST",
                          url: import.meta.env.VITE_API_URL + "/cuisines",
                          headers: {
                            Authorization: `Bearer ${localStorage.acces_token}`,
                          },
                          data: {
                            name: name,
                            description: description,
                            price: price,
                            imgUrl: imgUrl,
                            categoryId: categoryId,
                          },
                        });
                        Swal.fire({
                          title: `Success!`,
                          text: "Succes Add Product",
                          icon: `success`,
                        });
                        navigate("/");
                      } catch (error) {
                        const errMsg = error.response.data.message;
                        Swal.fire({
                          title: `Error!`,
                          text: errMsg,
                          icon: `error`,
                        });
                      }
                    }
                  }}
                  id="product-form"
                >
                  <div className="mb-3">
                    <label htmlFor="product-name">
                      Name <span className="text-danger fw-bold">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="product-name"
                      placeholder="Enter product name"
                      autoComplete="off"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="product-category">
                      Category <span className="text-danger fw-bold">*</span>
                    </label>
                    <select id="product-category" className="form-select" onChange={(e) => setCategoryId(e.target.value)} value={categoryId}>
                      <option defaultValue>-- Select Category --</option>
                      {categories.map((el, index) => {
                        return <Dropdown key={el.id} category={el} />;
                      })}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="product-desc">
                      Description <span className="text-danger fw-bold">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="product-desc"
                      placeholder="Enter product description"
                      autoComplete="off"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="product-price">
                      Price <span className="text-danger fw-bold">*</span>
                    </label>
                    <input
                      type="number"
                      min={0}
                      className="form-control"
                      id="product-price"
                      placeholder="Enter product price"
                      autoComplete="off"
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="product-image">Image</label>
                    <input
                      type="text"
                      className="form-control"
                      id="product-image"
                      placeholder="Enter product image url"
                      autoComplete="off"
                      onChange={(e) => setImgUrl(e.target.value)}
                      value={imgUrl}
                    />
                  </div>
                  <div className="row mt-5 mb-3">
                    <Button />
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default FormProduct;
