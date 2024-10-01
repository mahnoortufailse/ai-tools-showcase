import { useState } from "react";
import { imageGallery } from "../constants/index.js";
import "./Images.css";

export default function Images() {
  const [lightboxDisplay, setLightboxDisplay] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const openLightbox = (url) => {
    setCurrentImage(url);
    setLightboxDisplay(true);
  };

  const closeLightbox = () => {
    setLightboxDisplay(false);
  };

  // This function assigns a class based on the image index
  const getImageClass = (index) => {
    const pattern = ["large", "medium", "small"];
    return `image-container ${pattern[index % pattern.length]}`;
  };

  return (
    <>
      <div className="gallery">
        {imageGallery.map((item, index) => (
          <div
            key={index}
            className={getImageClass(index)} // Use getImageClass here
            onClick={() => openLightbox(item.image)}
          >
            <img
              src={item.image}
              alt={`Artwork ${index + 1}`}
              className="gallery-image"
            />
          </div>
        ))}
      </div>

      {lightboxDisplay && (
        <div className="lightbox" onClick={closeLightbox}>
          <span className="close-btn">&times;</span>
          <img className="lightbox-image" src={currentImage} alt="Artwork" />
        </div>
      )}
    </>
  );
}
