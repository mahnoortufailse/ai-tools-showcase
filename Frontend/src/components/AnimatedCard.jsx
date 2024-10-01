import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AnimatedCard = ({ data }) => {
  return (
    <div
      
      className="w-full max-w-[320px] rounded-[20px] bg-primary/5 backdrop-blur-lg py-12 px-8 text-center md:py-[30px] md:px-[40px] h-[350px] max-[639px]:h-[330px] flex flex-col justify-between border border-gray-300/40 shadow-lg"
    >
      <h3 className="text-white pb-1 text-lg font-bold sm:text-xl max-[639px]:text-lg">
        {data.name}
      </h3>
      <span className="bg-indigo-500 mx-auto mb-6 inline-block h-1 w-[90px] rounded" />
      <p className="text-gray-200 mb-3 text-base leading-relaxed max-[639px]:text-sm">
        {data.description}
      </p>
      <div className="flex items-center justify-center">
        <Link to={data.link}>
          <button className="bg-indigo-500 border-indigo-500 w-full max-w-[150px] rounded-lg border p-2 text-base font-medium text-white transition hover:bg-opacity-90 max-[639px]:text-sm max-[639px]:p-1">
            Let's Start
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AnimatedCard;
