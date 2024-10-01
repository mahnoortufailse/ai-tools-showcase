import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { StepsData } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const Card = ({ Step }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={Step.date}
      iconStyle={{ background: Step.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <img
            src={Step.icon}
            alt={Step.title}
            className='w-[100%] h-[100%] object-contain'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold '>{Step.title}</h3>
        
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {Step.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Steps = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
        Simplify your workflow and fuel creativity with AI innovation.
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
        Innovation Unleashed
        </h2>
        <div className="w-32 h-1 mx-auto bg-gradient-to-r from-pink-500 to-purple-400 rounded mb-6 relative z-10"></div>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {StepsData.map((Step, index) => (
            <Card
              key={`Step-${index}`}
              Step={Step}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Steps, "work");
