import React, { useEffect } from "react";

function Showproducts({ subcategory }) {
  console.log(subcategory);
  return (
    <div>
      {subcategory.products.map((item) => (
        <ul>
          <li>{item.name}</li>
        </ul>
      ))}
    </div>
  );
}

export default Showproducts;
