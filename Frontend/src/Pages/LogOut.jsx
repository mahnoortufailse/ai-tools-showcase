import { useAuth } from "../context/AuthProvider.jsx";
import toast from "react-hot-toast";
const LogOut = () => {
    const [authUser, setAuthUser] = useAuth();
    const handleLogout = () => {
      try {
        setAuthUser({
          ...authUser,
          user: null,
        });
        localStorage.removeItem("Users");
        toast.success("Logout successfully");
    
        setTimeout(() => {
          window.location.reload();
        }, 1000); // Reduce the delay for better UX
      } catch (error) {
        toast.error("Error: " + error);
      }
    };
    
    return (
      <div>
        <button
          className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    );
}

export default LogOut