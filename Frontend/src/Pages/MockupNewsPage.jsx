import React from "react";
import CreateMockupNewForm from "../components/CreateMockupNewForm";
import MockupList from "../components/MockupList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MockupNewsPage = () => {
  return (
    <>
      <div className="bg-primary">
        {" "}
        <CreateMockupNewForm />
        <MockupList />
        <ToastContainer />
      </div>
    </>
  );
};

export default MockupNewsPage;
