import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { UseAppContext } from "../context/context.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } = UseAppContext();

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(false);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sentVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );
      if (data.success) {
        navigate("email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6">
      <img src={assets.logo} alt="App Logo" className="w-28 sm:w-32" />
      {userData ? (
        <div className="flex justify-center w-8 h-8 items-center rounded-full text-white relative group bg-black">
          {userData.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              {!userData.isAccountVerified && (
                <li
                  onClick={sentVerificationOtp}
                  className="py-1 px-2 hover:bg-grap-200 cursor-pointer"
                >
                  Verify email
                </li>
              )}
              <li
                className="py-1 px-2 hover:bg-grap-200 cursor-pointer"
                onClick={logout}
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all ease-in-out"
          onClick={() => navigate("/login")}
        >
          Login <img src={assets.arrow_icon} alt="Arrow Icon" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
