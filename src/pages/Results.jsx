import React, { useState, useEffect, useMemo } from "react";
import { useActionData } from "react-router";
import { io } from "socket.io-client";
import { HomeLink } from "../components/index.js";
import products from "../database/products.js";
import { metaPropertiesStore } from "../state/index.js";

// Eagerly import all images from numbered asset directories
const allImages = import.meta.glob('../assets/[0-4]/PNGs/*.png', { eager: true });

// Organize images by folder number
const imagesByFolder = {};
Object.entries(allImages).forEach(([path, module]) => {
  const match = path.match(/\.\.\/assets\/(\d+)\/PNGs\//);
  if (match) {
    const folderNum = parseInt(match[1], 10);
    if (!imagesByFolder[folderNum]) {
      imagesByFolder[folderNum] = [];
    }
    imagesByFolder[folderNum].push(module.default);
  }
});

export default function Results() {
  const actData = useActionData();
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const currentProduct = products[currentProductIndex] || products[0];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get carousel images for the current product index
  const carouselImages = useMemo(() => {
    return imagesByFolder[currentProductIndex] || imagesByFolder[0] || ["/stand-in-2.png"];
  }, [currentProductIndex]);

  useEffect(() => {
    setCurrentProductIndex(actData.selection);
  }, []);

  // Reset image index when product changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [currentProductIndex]);

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const serialInterface = (currentProductIndex) => {
    const socket = io("http://localhost:8084");
    socket.on();
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
