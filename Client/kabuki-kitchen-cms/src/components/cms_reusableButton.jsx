import { useNavigate } from "react-router-dom";
function Button() {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/");
  };
  return (
    <>
      <div className="col-6">
        <button type="button" className="btn btn-lg btn-light rounded-pill w-100 p-2" onClick={handleCancel}>
          Cancel
        </button>
      </div>
      <div className="col-6">
        <button className="btn btn-lg btn-primary rounded-pill w-100 p-2" type="submit" href="">
          Submit
        </button>
      </div>
    </>
  );
}

export default Button;
