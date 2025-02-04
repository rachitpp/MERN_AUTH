import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { UseAppContext } from "../context/context";

const ResetPassword = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { backendUrl } = UseAppContext();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const inputRefs = React.useRef([]);

  const onEmailSent = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitResetOtp = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      setOtp(otpArray.join(""));
      setIsOtpSubmitted(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitNewPassword = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        {
          otp,
          email,
          newPassword,
        }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };
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
  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={assets.logo}
        onClick={() => navigate("/")}
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        alt=""
      />
      {!isEmailSent && (
        <form
          onSubmit={onEmailSent}
          className="bg-slate-900 p-8 rounded-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-2">
            Reset password
          </h1>
          <p className="text-center mb-6 text-indigo-300 ">
            Enter your email address
          </p>
          <div className="mb-1 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} className="w-3 h-3" alt="" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email id"
              className="bg-transparent outline-none text-white"
              required
            />
          </div>
          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-6">
            Submit
          </button>
        </form>
      )}

      {/* Otp input form */}
      {!isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitResetOtp}
          action=""
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 txt-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Password OTP
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
            className="w-full text-white py-2.5 rounded-md bg-gradient-to-r from-indigo-500 to-indigo-900"
          >
            Submit
          </button>
        </form>
      )}
      {isOtpSubmitted && (
        <form
          className="bg-slate-900 p-8 rounded-lg w-96 text-sm"
          onSubmit={onSubmitNewPassword}
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-2">
            New Password
          </h1>
          <p className="text-center mb-6 text-indigo-300 ">
            Enter the new Password below
          </p>
          <div className="mb-1 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} className="w-3 h-3" alt="" />
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              placeholder="New Password"
              className="bg-transparent outline-none text-white"
              required
            />
          </div>
          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-6">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
