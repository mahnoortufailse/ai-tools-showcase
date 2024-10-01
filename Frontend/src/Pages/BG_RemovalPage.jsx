import BackgroundRemovalText from "../components/BackgroundRemovalText"
import BG_RemovalForm from "../components/BG_RemovalForm"
import BG_RemovalGallery from "../components/BG_RemovalGallery"
import { ImagesData } from "../constants/index.js"

const BG_RemovalPage = () => {
  return (
    <>
    <div className=" ">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center py-24"><BackgroundRemovalText/>
      <BG_RemovalForm/></div>
     <div className="bg-primary"><BG_RemovalGallery images={ImagesData}/></div>
    
    </div>
   
    </>
  )
}

export default BG_RemovalPage