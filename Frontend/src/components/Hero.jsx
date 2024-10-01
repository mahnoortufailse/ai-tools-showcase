import { motion } from "framer-motion";
import styled from "styled-components";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { Link } from "react-router-dom";
const Hero = () => {
  const StyledWrapper = styled.div`
    .btn {
      font-size: 0.9rem;
      padding: 1rem 1.5rem;
      border: none;
      outline: none;
      border-radius: 0.4rem;
      cursor: pointer;
      text-transform: uppercase;
      background-color: rgb(14, 14, 26);
      color: rgb(234, 234, 234);
      font-weight: 700;
      transition: 0.6s;
      box-shadow: 0px 0px 60px #1f4c65;
      -webkit-box-reflect: below 10px
        linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
    }

    .btn:active {
      scale: 0.92;
    }

    .btn:hover {
      background: rgb(2, 29, 78);
      background: linear-gradient(
        270deg,
        rgba(2, 29, 78, 0.681) 0%,
        rgba(31, 215, 232, 0.873) 60%
      );
      color: rgb(4, 4, 38);
    }
  `;

  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Ai Tools <span className="text-[#915EFF]">Showcase</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            Explore AI tools to easily create images, icons, videos, PDFs,
            <br className="sm:block hidden" /> and mockups for social media!{" "}
            <br className="sm:block hidden" />
            Effortlessly turn your ideas into visuals!
          </p>
          <Link to="/functionalities"> <StyledWrapper>
            <button className="btn mt-6">Get Started</button>
          </StyledWrapper></Link>
         
        </div>
      </div>

      {/* <ComputersCanvas /> */}

      <div className="absolute xs:bottom-10 bottom-25 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
