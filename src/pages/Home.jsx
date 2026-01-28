import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import image1 from "../assets/scalp_carousel/AdobeStock_282261700.jpeg";
import image2 from "../assets/scalp_carousel/AdobeStock_287429773.jpeg";
import image3 from "../assets/scalp_carousel/AdobeStock_454999617.jpeg";
import image4 from "../assets/scalp_carousel/AdobeStock_600696847.jpeg";
import image5 from "../assets/scalp_carousel/AdobeStock_618796269.jpeg";
import image6 from "../assets/scalp_carousel/AdobeStock_955634709.jpeg";
import { resetQuestionnaireState } from "../state/questionnaireState.js";

const carouselImages = [
  { src: image1, alt: "Scalp care image 1" },
  { src: image2, alt: "Scalp care image 2" },
  { src: image3, alt: "Scalp care image 3" },
  { src: image4, alt: "Scalp care image 4" },
  { src: image5, alt: "Scalp care image 5" },
  { src: image6, alt: "Scalp care image 6" },
];

export default function Home() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    resetQuestionnaireState();
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % carouselImages.length
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [isPaused]);
  //reset the state-questionnaire
  //
  //button needs to reset the values in the state-questionnaire before going to next page (quiz)

  return (
    <div className="page-container home-page">
      <div 
        className="home-image-section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {carouselImages.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={`home-image ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>
      <div className="home-content-section">
        <h1 className="home-title">
          Find Your<br />
          Perfect Scalp-Care<br />
          Shampoo
        </h1>
        <button 
          className="home-cta-button"
          onClick={() => { navigate("/quiz", { viewTransition: true }) }}
        >
          Start Here
        </button>
        <p className="home-footer-link m-10">Find more at Walmart.com</p>
      </div>
    </div>
  );
}
