import React, { useEffect } from "react";
import { Router, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserFromToken } from "../../redux/slices/authSlice";

const GoogleAuthSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  useEffect(() => {
    // ✅ Delay execution slightly to ensure URL is fully loaded
    const timeout = setTimeout(() => {
      const url = new URL(window.location.href);
      const token = url.searchParams.get("token");

      if (token) {
        console.log("Token found:", token);
        localStorage.setItem("token", token);
        dispatch(fetchUserFromToken());
        // window.location = "http://localhost:5173";
        // navigate("/");
        window.location.reload();
      } else {
        console.error("No token found in URL");
        navigate("/login");
      }
    }, 50); // Small delay to ensure location is accurate

    return () => clearTimeout(timeout);
  }, [dispatch, navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      navigate("/");
    }    
  }, [])
  

  return <div>Logging in...</div>;
};

export default GoogleAuthSuccess;
