/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  // Backend URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  axios.defaults.withCredentials = true;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  };
  const isAuthenticated = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    isAuthenticated();
  }, []);
  const contextValue = {
    backendUrl,
    isLoggedIn,
    userData,
    setUserData,
    setIsLoggedIn,
    getUserData,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
function UseAppContext() {
  const context = useContext(StoreContext);
  if (context === undefined)
    throw new Error("Store context was used outside it's range ");
  return context;
}
export { StoreContextProvider, UseAppContext };
