import React from "react";
import profile from "../../assets/profile.png";
import { Link, useParams } from "react-router-dom";
import Logout from "../../lib/logout";

const UserSidebar = ({ projectNumber }) => {
  const { userEmail } = useParams();
  const handleLogout = Logout();
  return (
    <div
      className="flex flex-col h-screen w-full justify-between items-center py-10 border-r-0
      rounded-sm shadow-md bg-[#981F2A]"
    >
      <div className="flex flex-col text-white gap-5 items-center">
        <div className="w-[7rem] h-[7rem] rounded-full items-center mt-8">
          <img src={profile} alt="profile pic" className="w-full h-full" />
        </div>
      </div>

      <div className="flex flex-col mt-5 gap-2">
        <Link
          to={`/${userEmail}/user-dashboard`}
          className="flex text-xl text-white"
        >
          Dashboard
        </Link>
        <Link
          to={`/${userEmail}/user-dashboard/grades`}
          className="flex text-xl text-white"
        >
          Grades & Feedbacks
        </Link>
        <Link
          to={`/${userEmail}/user-dashboard/announcements`}
          className="flex text-xl text-white"
        >
          Announcements
        </Link>
      </div>

      <div className="flex items-center mt-8">
        <button
          onClick={() => handleLogout()}
          className=" rounded-md px-8 py-3 border-none bg-white text-2xl text-[#981F2A] shadow-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
