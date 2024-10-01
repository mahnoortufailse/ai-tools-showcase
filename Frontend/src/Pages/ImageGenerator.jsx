import Generate_Image from "../components/Generate_Image"
import Images from "../components/Images"


/**
 * ImageGeneration component is a container for two components: Generate_Image and Images.
 * The purpose of this component is to render these two components in the same page.
 * The Generate_Image component is used to generate an image based on the user's input.
 * The Images component renders the list of generated images.
 */

const ImageGenerator = () => {
  return (
    <div>
       <Generate_Image/>
    </div>
  )
}

export default ImageGenerator