import React, { useState, useEffect } from "react";
import { useActionData } from "react-router";
import { io } from "socket.io-client";
import { HomeLink } from "../components/index.js";
import products from "../database/products.js"; 

export default function Results() {
  const actData = useActionData();
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const currentProduct = products[currentProductIndex] || products[0];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Create an array of images using the current product image as stand-in
  const carouselImages = [
    currentProduct.image || "/stand-in-2.png",
    currentProduct.image || "/stand-in-2.png",
    currentProduct.image || "/stand-in-2.png"
  ];

  useEffect(() => {
    setCurrentProductIndex(actData.selection);
  },[]);

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const serialInterface = (currentProductIndex) => {
    // change button text??
    // run serial lights with correct selection

    const socket = io("http://localhost:8080");
  }

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
          <button 
            className="carousel-button carousel-button-prev"
            onClick={handlePrev}
            aria-label="Previous image"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 9L4.5 6L7.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <img 
            src={carouselImages[currentImageIndex]} 
            alt={currentProduct.name}
            className="product-image"
          />
          
          <button 
            className="carousel-button carousel-button-next"
            onClick={handleNext}
            aria-label="Next image"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

        <button 
          className="results-cta-button"
          onClick={() => serialInterface(currentProductIndex)}
        >
          See Product at Shelf →
        </button>

        <HomeLink />
      </div>
  );
}
