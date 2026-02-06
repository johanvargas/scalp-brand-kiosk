import React, { useState, useEffect } from "react";
import { useActionData } from "react-router";
import { io } from "socket.io-client";
import { HomeLink } from "../components/index.js";
import products from "../database/products.js";
import { metaPropertiesStore } from "../state/index.js";

// Lazy glob - images are loaded on-demand, not at bundle time
const imageModules = import.meta.glob('../assets/[0-4]/PNGs/*.png');

// Cache loaded images to avoid re-fetching
const imageCache = {};

// Load images for a specific folder
const loadImagesForFolder = async (folderNum) => {
  if (imageCache[folderNum]) {
    return imageCache[folderNum];
  }

  const folderPattern = `../assets/${folderNum}/PNGs/`;
  const relevantPaths = Object.keys(imageModules).filter(path =>
    path.startsWith(folderPattern)
  );

  const images = await Promise.all(
    relevantPaths.map(async (path) => {
      const module = await imageModules[path]();
      return module.default;
    })
  );

  imageCache[folderNum] = images;
  return images;
};

export default function Results() {
  const actData = useActionData();
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const currentProduct = products[currentProductIndex] || products[0];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carouselImages, setCarouselImages] = useState(["/stand-in-2.png"]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentProductIndex(actData.selection);
  }, []);

  // Load images and reset index when product changes
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setCurrentImageIndex(0);

    loadImagesForFolder(currentProductIndex).then((images) => {
      if (isMounted) {
        setCarouselImages(images.length > 0 ? images : ["/stand-in-2.png"]);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
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
          
          {isLoading ? (
            <div className="product-image loading-placeholder" />
          ) : (
            <img 
              src={carouselImages[currentImageIndex]} 
              alt={currentProduct.name}
              className="product-image"
            />
          )}
          
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
