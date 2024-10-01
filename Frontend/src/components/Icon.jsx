import React from "react";

import { BallCanvas } from "./canvas/index.js";
import { SectionWrapper } from "../hoc/index.js";
import { ICONS } from "../constants/index.js";

const Icon = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {ICONS.map((icon) => (
        <div className='w-28 h-28' key={icon.name}>
          <BallCanvas icon={icon.icon} />
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Icon, "");
