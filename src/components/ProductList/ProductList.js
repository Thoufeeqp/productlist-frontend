import React, { useState, useEffect } from "react";
import axiosInstance from "../Axios-instance";
import Showproducts from "../Showproducts/Showproducts";

function ProductList({ category }) {
  const [selectedOption, setSelectedOption] = useState();
  const [subcategory, setsubcategory] = useState();
  useEffect(() => {
    setsubcategory(category);
  }, [category]);

  const handleonClick = (category) => {
    setsubcategory(category);
  };
  const handleClick = (subcategoryName) => {
    console.log(subcategoryName);
    const newSelectedOption = subcategoryName;
    setSelectedOption(newSelectedOption);
    axiosInstance
      .get(`getsubcategory/${newSelectedOption}`)
      .then((response) => {
        // Handle the response data
        // console.log("Response:", category);
        if (response == undefined) {
          handleClick();
        }
        setsubcategory(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <div key={category._id}>
        <h5
          className="m-1 text-primary"
          value={category}
          onClick={() => handleonClick(category)} // Pass category as a parameter
          key={category._id}
        >
          {category.name}({category.products.length})
        </h5>
        <h6>Subcategories</h6>
        {category.subcategories.map((subcategory) => (
          <button
            className="text-primary ms-4 mb-2"
            value={subcategory.name}
            onClick={() => handleClick(subcategory.name)} // Pass subcategory.name as a parameter
            key={subcategory._id}
          >
            {subcategory.name}
          </button>
        ))}

        <h5>products</h5>
        {subcategory ? <Showproducts subcategory={subcategory} /> : undefined}
      </div>
    </div>
  );
}

export default ProductList;
