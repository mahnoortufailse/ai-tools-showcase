import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServicesData } from "../constants/index.js";
import AnimatedCard from "../components/AnimatedCard";

gsap.registerPlugin(ScrollTrigger);

const Functionalities = () => {
  useEffect(() => {
    // Animation for each card
    gsap.from(".animated-card", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".animated-card",
        start: "top 80%",
        end: "bottom 60%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center lg:p-13 md:p-10 p-4 bg-primary bg-cover bg-no-repeat bg-center text-center">
      <div className="w-full px-4 md:px-14 py-12 max-[639px]:p-8 max-[639px]:py-20 max-[639px]:px-5 bg-transparent pt-20 ">
        <div className="flex flex-wrap justify-center gap-10">
          {ServicesData.map((item, index) => (
            <div key={index} className="animated-card mb-2 lg:mb-1">
              <AnimatedCard data={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Functionalities;
