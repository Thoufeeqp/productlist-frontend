import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axiosInstance from "../Axios-instance";
import ProductList from "../ProductList/ProductList";

function CategoryList() {
  const [selectedOption, setSelectedOption] = useState();
  const [category, setcategory] = useState();

  const handleOptionChange = (e) => {
    const newSelectedOption = e.target.value;
    console.log(newSelectedOption);

    axiosInstance
      .get(`getcategory/${newSelectedOption}`)
      .then((response) => {
        // Handle the response data
        // console.log("Response:", category);
        if (response == undefined) {
          handleOptionChange(e);
        }
        setcategory(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const [showitem, setshowitem] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("listcategories")
      .then((response) => {
        // Handle the response data
        console.log("Response:", response.data);
        setshowitem(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="row d-flex">
      <div className="col-lg-4 d-flex flex-column p-5 ms-5 mt-5">
        <Link to="/create-category">
          create category
          <i className="ms-2 fa-solid fa-arrow-left fa-beat-fade"></i>
        </Link>
        <Link to="/create-product">
          create product
          <i className="ms-2 fa-solid fa-arrow-left fa-beat-fade"></i>
        </Link>
      </div>
      <div className="col-lg-4 m-5 p-5 ">
        <h3 className="text-center m-2">PRODUCT LISTING</h3>

        <div>
          <label htmlFor="dropdown">
            <h6 className="text-center m-2">Please Choose Category:</h6>
          </label>
          <select
            id="dropdown"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            {" "}
            <option value="">select</option>
            {showitem.map((option) => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        {category ? <ProductList category={category} /> : undefined}
      </div>
    </div>
  );
}

export default CategoryList;
