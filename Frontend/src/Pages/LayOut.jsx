import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Hero, Navbar } from "../components";
import Footer from "../components/Footer";

const LayOut = () => {
  const location = useLocation();

  // Define the paths where you don't want to show the header and footer
  const noHeaderFooterRoutes = ["/login", "/signup"];

  // Check if the current location matches any of the noHeaderFooterRoutes
  const hideHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && (
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          {/* Render Hero only on the home page ("/") */}
          {location.pathname === "/" && <Hero />}
        </div>
      )}
      <Outlet />
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default LayOut;
