import React from 'react';
import Images from '../components/Images';
import Btn from '../components/Btn';

const GalleryPage = () => {
  return (
    <><div className="bg-primary flex items-center justify-center text-center py-40 px-4 sm:px-10 md:px-20 lg:px-40 pb-20 flex-col">
    <Btn text={"Generate Your own Art-AI Image Generator"} link={'/generate-images'} />
  </div>
  <div className='bg-primary p-6'> <Images/></div>
 
  </>
  );
}

export default GalleryPage;
