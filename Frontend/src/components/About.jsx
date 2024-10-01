import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const About = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      {/* Image Section */}
      <motion.div
        variants={fadeIn("left", "spring", 0.5, 0.75)}
        className="w-full md:w-1/2"
      >
        <img
          src="./public/AboutUs.jpg"
          alt="about"
          className="w-full h-auto object-cover rounded-[20px]"
        />
      </motion.div>

      {/* Text Section */}
      <motion.div
        variants={textVariant()}
        className="w-full md:w-1/2 mt-8 md:mt-0 md:ml-8"
      >
        <h2 className={styles.sectionHeadText}>About Us</h2>
        <div className="w-32 h-1 bg-gradient-to-r from-pink-500 to-purple-400 rounded mb-6 relative z-10"></div>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Welcome to our AI Tools Showcase, where creativity meets innovation.
          Our platform provides a comprehensive suite of AI-driven tools to help
          users generate images, icons, PDFs, videos, backgrounds, and more.
          Whether you're a designer, marketer, or content creator, our tools are
          designed to simplify your workflow and bring your ideas to life.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(About, "about");
