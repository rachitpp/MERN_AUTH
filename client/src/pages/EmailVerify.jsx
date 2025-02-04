import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import React, { useEffect } from "react";
import axios from "axios";
import { UseAppContext } from "../context/context";
import { toast } from "react-toastify";

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const inputRefs = React.useRef([]);
  const { backendUrl, getUserData, userData, isLoggedIn } = UseAppContext();
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handlePaste = (e) => {
    e.preventDefault(); // Prevent default paste behavior
    const paste = e.clipboardData.getData("text"); // Get text data
    const pasteArray = paste.replace(/\D/g, "").split("").slice(0, 6); // Clean non-digits and limit to 6

    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
        // Focus next input after paste
        if (index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      }
    });
  };
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      const { data } = await axios.post(backendUrl + "/api/auth/verify-email", {
        otp,
      });
      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    isLoggedIn && userData.isAccountVerified && userData && navigate("/");
  }, [isLoggedIn, navigate, userData]);
  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={assets.logo}
        onClick={() => navigate("/")}
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        alt=""
      />
      <form
        onSubmit={onSubmitHandler}
        action=""
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 txt-sm"
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Email Verfiy OTP
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the 6-digit code sent to your email id.
        </p>
        <div className="flex justify-between mb-8 ">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                onPaste={handlePaste}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(e) => (inputRefs.current[index] = e)}
                className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
              />
            ))}
        </div>
        <button
          type="Submit"
          className="w-full text-white py-3 rounded-md bg-gradient-to-r from-indigo-500 to-indigo-900"
        >
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
