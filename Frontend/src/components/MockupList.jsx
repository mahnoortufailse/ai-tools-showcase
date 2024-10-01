import React, { useEffect, useState } from "react";
import axios from "axios";

const MockupList = () => {
  const [mockups, setMockups] = useState([]);

  useEffect(() => {
    const fetchMockups = async () => {
      try {
        const { data } = await axios.get("http://localhost:9000/mockupNews");
        console.log("Fetched Mockups:", data); // Log fetched mockups
        setMockups(data);
      } catch (error) {
        console.error("Error fetching mockups:", error);
      }
    };
    fetchMockups();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 py-16 px-4">
      {/* Top Heading and Description */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-4">
          Latest Mockup News
        </h1>
        <p className="text-lg text-gray-400">
          Stay updated with the latest mockups and design trends. Check out the
          newest mockup previews below and get inspired!
        </p>
      </div>

      {/* Mockup List */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6">
        {mockups.map((mockup) => (
          <div
            key={mockup._id}
            className="mockup-item bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-bold text-blue-400 mb-4">
              {mockup.headline}
            </h2>
            <p className="text-gray-300 mb-4">{mockup.content}</p>
            {console.log("MockUp Image", mockup.image)}
            {mockup.image && (
              <img
                src={`http://localhost:9000${mockup.image}`} // Reference image correctly
                alt={mockup.headline}
                className="w-full h-40 object-cover rounded-lg shadow-md"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MockupList;
