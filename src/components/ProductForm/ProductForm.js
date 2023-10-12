import React, { useState, useEffect } from "react";
import "../Axios-instance";
import axiosInstance from "../Axios-instance";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function ProductForm({ categoryId, onCreateProduct }) {
  const [productName, setProductName] = useState("");
  const [selectedOption, setSelectedOption] = useState();
  const [selectedsubOption, setSelectedsubOption] = useState();
  const navigate = useNavigate();
  const [showitem, setshowitem] = useState([]);
  const [subcategoryName, setsubCategoryName] = useState("");
  const [category, setcategory] = useState();

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleOptionChange = (e) => {
    const newSelectedOption = e.target.value;
    console.log(newSelectedOption);
    setSelectedOption(newSelectedOption);

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
  const handleonOptionChange = (e) => {
    const newSelectedOption = e.target.value;
    setSelectedsubOption(newSelectedOption);
    console.log(newSelectedOption);
    setsubCategoryName(newSelectedOption);
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (productName.trim() !== "") {
      console.log(selectedOption, subcategoryName, productName);
      const name = selectedOption;
      const body = {
        name,
        subcategoryName,
        productName,
      };
      axiosInstance
        .post("createproduct", body)
        .then((response) => {
          // Handle the response data
          //console.log('Response:', response.data);
          alert("product created successfully");
          navigate("/");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      setProductName("");
    }
  };
  return (
    <div className="m-5 p-5">
      <h2>Add a New Product</h2>
      <div>
        <label htmlFor="dropdown">
          <h6 className="text-center m-2">Plese Choose Category:</h6>
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

      {category && (
        <div>
          <label htmlFor="dropdown">
            <h6 className="text-center m-2">Plese Choose subcategory:</h6>
          </label>
          <select
            id="dropdown"
            value={selectedsubOption}
            onChange={handleonOptionChange}
          >
            {" "}
            <option value="">select</option>
            {category.subcategories.map((option) => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter product name"
            value={productName}
            onChange={handleProductNameChange}
          />
        </div>

        <button type="submit">Create Product</button>
      </form>
      <Link to="/">
        Home<i className="ms-2 fa-solid fa-arrow-left fa-beat-fade"></i>
      </Link>
    </div>
  );
}

export default ProductForm;
