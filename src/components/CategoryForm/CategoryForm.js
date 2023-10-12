import React, { useState, useEffect } from "react";
import "../Axios-instance";
import axiosInstance from "../Axios-instance";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function CategoryForm() {
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setsubCategoryName] = useState("");
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState();
  const [showitem, setshowitem] = useState([]);

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };
  const handlesubCategoryNameChange = (event) => {
    setsubCategoryName(event.target.value);
  };

  const handleOptionChange = (e) => {
    const newSelectedOption = e.target.value;
    console.log(newSelectedOption);
    setSelectedOption(newSelectedOption);
  };

  const handleonOptionChange = (e) => {
    const newSelectedOption = e.target.value;
    console.log(newSelectedOption);
    setCategoryName(newSelectedOption);
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
    if (categoryName.trim() !== "") {
      // Call the callback function to create the category
      const name = categoryName;
      const body = { name };
      console.log(name);
      axiosInstance
        .post("createcategory", body)
        .then((response) => {
          // Handle the response data
          // console.log('Response:', response.data);
          alert("category created successfully");
          navigate("/");
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      //onCreateCategory(categoryName);
      // Clear the input field
      setCategoryName("");
    }
  };
  const handleonSubmit = (event) => {
    event.preventDefault();
    if (subcategoryName.trim() !== "") {
      // Call the callback function to create the category
      const body = { categoryName, subcategoryName };
      console.log(categoryName);
      console.log(subcategoryName);
      axiosInstance
        .post("createsubcategory", body)
        .then((response) => {
          // Handle the response data
          //console.log('Response:', response.data);
          alert("category created successfully");
          navigate("/");
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      //onCreateCategory(categoryName);
      // Clear the input field
      setsubCategoryName("");
    }
  };

  return (
    <div className="row d-flex m-5 p-5">
      <div className="col-lg-6 p-5">
        <h2>Create a New Category</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={handleCategoryNameChange}
          />
          <button type="submit">Create</button>
        </form>
      </div>
      <div className="col-lg-6">
        <h2>Create a New Subcategory</h2>

        <div>
          <label htmlFor="dropdown">
            <h6 className="text-center m-2">Plese Choose Category:</h6>
          </label>
          <select
            id="dropdown"
            value={selectedOption}
            onChange={handleonOptionChange}
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
        <form onSubmit={handleonSubmit}>
          <input
            type="text"
            placeholder="subcategory Name"
            value={subcategoryName}
            onChange={handlesubCategoryNameChange}
          />
          <button type="submit">Create</button>
        </form>
      </div>
      <Link to="/">
        Home<i className="ms-2 fa-solid fa-arrow-left fa-beat-fade"></i>
      </Link>
    </div>
  );
}

export default CategoryForm;
