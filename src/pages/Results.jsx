import React, { useState, useEffect } from "react";
import { useActionData } from "react-router";
import { HomeLink } from "../components/index.js";
import products from "../database/products.js"; 


export default function Results() {
  const actData = useActionData();
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const currentProduct = products[currentProductIndex] || products[0];

  useEffect(() => {
    setCurrentProductIndex(actData.selection);
  },[]);

  return (
    <div className="page-container results-page">
      <div className="results-content">

        <div className="results-header">
          <p className="results-subtitle">We recommend a product with</p>
          <h1 className="results-title">
            {currentProduct.name}
            <span className="results-title-underline"></span>
          </h1>
          <p className="results-description">{currentProduct.description}</p>
        </div>
          
        <div className="product-image-container">
            <img 
              src={currentProduct.image || "/stand-in-2.png"} 
              alt={currentProduct.name}
              className="product-image"
            />
        </div>
      </div>

        <button 
          className="results-cta-button"
          onClick={() => "animation to cubby"}
        >
          See Product at Shelf →
        </button>

        <HomeLink />
      </div>
  );
}
