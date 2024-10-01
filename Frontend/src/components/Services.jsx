import React from "react";
import Tilt from "react-parallax-tilt";

import { motion } from "framer-motion";
import {Link} from "react-router-dom"
import { styles } from "../styles";

import { SectionWrapper } from "../hoc";
import { services } from "../constants/index.js";
import { fadeIn, textVariant } from "../utils/motion";


const Card = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const Services = () => {
  return (
    <>
      
      <motion.div variants={textVariant()}>

        <h2 className={`${styles.sectionHeadText}`}>Services</h2>
        <div className="w-32 h-1 bg-gradient-to-r from-pink-500 to-purple-400 rounded mb-6 relative z-10"></div>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Our website offers a range of innovative services: generate vivid images from text, create custom icons, convert content into PDFs, produce simple videos with text and images, design unique backgrounds, remove backgrounds from images, and craft eye-catching news mockups for social media or presentations.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {services.map((service, index) => (
          <Link to={service.link} key={index}><Card index={index} {...service} /></Link>
          
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Services, "services");
