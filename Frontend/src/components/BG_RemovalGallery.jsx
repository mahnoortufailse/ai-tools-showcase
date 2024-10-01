/* eslint-disable react/prop-types */
import { useState } from 'react';

const BG_RemovalGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div className='py-20 max-[640px]:py-6'>
        <h2 className="text-center text-white text-4xl lg:text-5xl font-bold leading-tight mb-6">
          Just Picture It!
        </h2>
        <div className="w-32 h-1 mx-auto bg-gradient-to-r from-pink-500 to-purple-400 rounded mb-6 relative z-10"></div>
        <div className="text-center text-gray-400 font-light text-base">
          Our background removal software uses advanced AI algorithms to seamlessly isolate and remove backgrounds from images
        </div>
      </div>
      
      {/* Responsive container */}
      <div className="relative w-full overflow-hidden rounded-lg" style={{ height: 'auto' }}>
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 flex items-center justify-center"
              style={{ width: '100%', height: '100%' }}
            >
              <img
                src={img.src}
                alt={`Slide ${index}`}
                className="object-cover w-full h-auto max-w-7xl"
                style={{ maxHeight: '80vh' }} // Keeps the image height responsive
              />
            </div>
          ))}
        </div>
        
        {/* Previous button */}
        <button
          type="button"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-gray-700/30 hover:bg-gray-400/50 focus:ring-4 focus:ring-slate-600"
          onClick={goToPrevious}
        >
          <span className="sr-only">Previous</span>
          <svg
            className="w-4 h-4 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        </button>
        
        {/* Next button */}
        <button
          type="button"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-gray-700/30 hover:bg-gray-400/50 focus:ring-4 focus:ring-slate-600"
          onClick={goToNext}
        >
          <span className="sr-only">Next</span>
          <svg
            className="w-4 h-4 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default BG_RemovalGallery;
