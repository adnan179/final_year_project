import React, { useState } from "react";
import logo from "../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handlePopup } from "../lib/popUps";
import { InVisibleEye, VisibleEye } from "../lib/eyes";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:4000/login", {
        email: email,
        password: password,
      });

      // Check if the response contains a token and role
      if (response.data.token && response.data.role) {
        const { token, role, projectNumber } = response.data;
        localStorage.setItem("token", token);
        if (projectNumber) {
          localStorage.setItem("projectNumber", projectNumber);
        }

        // Use a switch statement for role-based routing
        switch (role) {
          case "admin":
            navigate(`/${email}/admin-dashboard/projects`);
            handlePopup("Welcome Admin", "success");
            break;
          case "reviewer":
            navigate(`/${email}/reviewer-dashboard/projects`);
            handlePopup("Welcome Reviewer", "success");
            break;
          case "user":
            navigate(`/${email}/user-dashboard`);
            handlePopup("Welcome User", "success");
            break;
          default:
            console.error("Unknown role:", role);
            handlePopup("Unknown role", "error");
            break;
        }
      } else {
        console.error("Invalid response format:", response.data);
        handlePopup("Login failed", "error");
        localStorage.removeItem("token");
        localStorage.removeItem("projectNumber");
      }
    } catch (err) {
      if (err.response.status === 401) {
        console.error("Invalid email or password");
        handlePopup("Login failed", "error");
        localStorage.removeItem("token");
        localStorage.removeItem("projectNumber");
      } else {
        console.error("An error occurred:", err);
        handlePopup("Login failed", "error");
        localStorage.removeItem("token");
        localStorage.removeItem("projectNumber");
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <form
        className="flex flex-col w-[15rem] sm:w-[25rem] bg-[#E5DFDF] justify-center items-center rounded-lg shadow-xl pb-10"
        onSubmit={handleSubmit}
      >
        <div className="flex w-[15rem] h-[10rem] sm:w-[20rem] sm:h-[15rem] -mt-[25px]">
          <img
            src={logo}
            alt="gitam university"
            width={"100%"}
            height={"100%"}
          />
        </div>
        <div className="flex flex-col -mt-[50px]">
          <label htmlFor="email" className="text-xl pb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your Email"
            className="flex text-base w-[10rem] sm:w-[20rem] px-4 py-2 border-[2px] border-gray-700 text-gray-700 outline-none
                rounded-md focus:ring-blue-500 focus:border-blue-500 focus:ring-1 "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-xl pb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={isVisible ? "text" : "password"}
              placeholder="Enter Your Password"
              className="px-4 py-2 w-[10rem] sm:w-[20rem] text-base border-[2px] border-gray-700 rounded-md outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? <VisibleEye /> : <InVisibleEye />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#981F2A] border-none rounded text-white font-medium cursor-pointer px-3 py-2 sm:px-6 sm:py-3 text-xl mt-10  
          justify-center items-center transition duration-300 ease-in-out hover:scale-105"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
