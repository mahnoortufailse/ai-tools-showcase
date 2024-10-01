import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider"; // Make sure the path is correct

const PrivateRoute = ({ children }) => {
  const [authUser] = useAuth(); // Get authUser from the context

  // Check if the user is authenticated; if not, redirect to signup page
  return authUser ? children : <Navigate to="/signup" />;
};

export default PrivateRoute;
