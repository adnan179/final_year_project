import { useNavigate } from "react-router-dom";
import { handlePopup } from "./popUps";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token and projectNumber from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("projectNumber");
    // Redirect to the login page
    handlePopup("successfully logged out", "success");
    navigate("/");
    window.location.reload();
  };

  return handleLogout;
};

export default Logout;
