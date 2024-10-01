import LayOut from "./Pages/LayOut";
import Home from "./Pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Functionalities from "./Pages/Functionalities";
import ImageGenerator from "./Pages/ImageGenerator";
import IconGenerator from "./Pages/IconGenerator";
import BG_RemovalPage from "./Pages/BG_RemovalPage";
import GenerateVideoPage from "./Pages/GenerateVideoPage";
import BackgroundGeneratePage from "./Pages/BackgroundGeneratePage";
import PDFGeneratorPage from "./Pages/PDFGeneratorPage";
import GalleryPage from "./Pages/GalleryPage";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import MockupNewsPage from "./Pages/MockupNewsPage";
import MockupPreview from "./components/MockupPreview";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<LayOut />}>
          <Route path="/" element={<Home />} />

          {/* Protect routes with PrivateRoute */}
          <Route
            path="/functionalities"
            element={
              <PrivateRoute>
                <Functionalities />
              </PrivateRoute>
            }
          />
          <Route
            path="/generate-images"
            element={
              <PrivateRoute>
                <ImageGenerator />
              </PrivateRoute>
            }
          />
          <Route
            path="/generate-icons"
            element={
              <PrivateRoute>
                <IconGenerator />
              </PrivateRoute>
            }
          />
          <Route
            path="/remove-background"
            element={
              <PrivateRoute>
                <BG_RemovalPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/generate-video"
            element={
              <PrivateRoute>
                <GenerateVideoPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/generate-pdf"
            element={
              <PrivateRoute>
                <PDFGeneratorPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/mockupNews"
            element={
              <PrivateRoute>
                <MockupNewsPage />
              </PrivateRoute>
            }
          />

          {/* Public routes */}
          <Route
            path="/backgroundGenerate/:imageUrl"
            element={<BackgroundGeneratePage />}
          />
          <Route path="/images" element={<GalleryPage />} />
          <Route path="/mockupPreview" element={<MockupPreview />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
