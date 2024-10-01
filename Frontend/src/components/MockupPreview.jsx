import React from "react";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";
import { StarsCanvas } from "./canvas";



const MockupPreview = () => {
  const location = useLocation();
  const { headline, content, image } = location.state || {};

  const handleDownload = async () => {
    const element = document.getElementById("mockup-preview");

    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2,
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "mockup-preview.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = (platform) => {
    let url = "";
    const shareText = `${headline} - ${content}`;

    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${encodeURIComponent(image)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          image
        )}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          image
        )}&title=${encodeURIComponent(headline)}&summary=${encodeURIComponent(
          content
        )}`;
        break;
      default:
        break;
    }

    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-hero-pattern bg-center bg-cover bg-no-repeat py-24 md:py-32 mx-0 md:px-6 ">
     
      <div className="mockup-preview flex flex-col md:flex-row text-white w-auto md:p-10 p-4 ">
        <div
          id="mockup-preview"
          className="flex-1 mb-6 border border-gray-700 p-8 bg-primary w-full md:w-1/2"
        >
          <h1 className="text-4xl font-extrabold mb-4 text-blue-400">
            {headline}
          </h1>
          <p className="text-base text-gray-300 mb-6 leading-relaxed">
            {content}
          </p>
          {image && (
            <div className="flex justify-start mb-6">
              <img
                src={image}
                alt="news"
                className="max-w-full h-[300px] rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col  items-center space-y-4 md:ml-2 align-middle my-auto p-4 w-full md:w-1/2">
          <span className="text-lg font-semibold text-gray-200">
            You Can Download{" "}
          </span>
          <button
            onClick={handleDownload}
            className="bg-white/40 backdrop-blur-lg text-white font-semibold py-3 px-5 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Download Mockup
          </button>
          <span className="text-2xl font-semibold text-gray-200">
            Share this news
          </span>
          <div className="text-gray-300 text-lg text-center">
            <p>Sharing is caring! Let others know about this news by sharing it on social media.</p>
            <p>Use the buttons above to quickly post on your favorite platforms!</p>
          </div>
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => handleShare("twitter")}
              className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Twitter
            </button>
            <button
              onClick={() => handleShare("facebook")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Facebook
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              LinkedIn
            </button>
          </div>
        </div>
        
      </div>
     <StarsCanvas/>
    </div>
    
  );
};

export default MockupPreview;
