import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { menu, close } from "../assets";
import LogOut from "../Pages/LogOut";
import { useAuth } from "../context/AuthProvider.jsx";
const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { authUser, setAuthUser } = useAuth();
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      {" "}
      {/* <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-secondary"
                }`}
                onClick={() => {
                  setToggle(!toggle);
                  setActive(nav.title);
                }}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div> */}
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src="/Logo.png"
            alt="logo"
            className="w-14 h-14 object-contain max-[470px]:w-5 max-[470px]:h-5"
          />
          <p className="text-white text-[18px] font-bold cursor-pointer flex  max-[470px]:text-[13px]">
            AI Tool Generator
          </p>
        </Link>
        <div className="flex gap-6 max-[450px]:gap-3">
          {/* <ul className="list-none hidden sm:flex flex-row gap-10">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul> */}
          <div><Link
                to="/signup"
                className="bg-black-200 text-white px-5 py-2 rounded-md hover:bg-slate-800 cursor-pointer duration-300 max-[470px]:px-3 max-[470px]:py-1 max-[470px]:text-sm "
              >
                SignUp
              </Link></div>
          <div>
            {
               authUser ? (<LogOut/>) : ( <Link
                to="/login"
                className="bg-gray-900/30 backdrop-blur-md text-white px-5 py-2 rounded-md hover:bg-slate-800 cursor-pointer duration-300 border border-gray-600 max-[470px]:px-3 max-[470px]:py-1 max-[470px]:text-sm"
              >
                LogIn
              </Link>)
            }
           
          </div>{" "}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
