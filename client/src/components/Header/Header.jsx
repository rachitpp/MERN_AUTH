import { assets } from "../../assets/assets";
import { UseAppContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { userData } = UseAppContext();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center px-4 text-center mt-20">
      <img
        src={assets.header_img}
        alt="Header Avatar"
        className="w-36 h-36 rounded-b-full mb-6"
      />
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hey {userData.name ? userData.name : "Developer"}{" "}
        <img
          src={assets.hand_wave}
          alt="Hand Wave"
          className="w-8 aspect-square"
        />
      </h1>
      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome to our App
      </h2>
      <p className="mb-8 max-w-md">
        Let&apos;s start with a quick product tour and we will have you up and
        running in no time
      </p>
      <button
        onClick={() => navigate("/login")}
        className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all"
      >
        Get Started
      </button>
    </div>
  );
};

export default Header;
