import React from "react";
import { Link, useParams } from "react-router-dom";
import profile from "../../assets/profile.png";
import Logout from "../../lib/logout";

const ReviewerSidebar = () => {
  const { reviewerEmail } = useParams();
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
        <h2 className="text-white font-medium font-poppins text-xl">
          Welcome Reviewer
        </h2>
      </div>

      <div className="flex flex-col mt-5 gap-3">
        <Link
          to={`/${reviewerEmail}/reviewer-dashboard/projects`}
          className="flex text-xl text-white"
        >
          Projects
        </Link>
        <Link
          to={`/${reviewerEmail}/reviewer-dashboard/projectsAssigned`}
          className="flex text-xl text-white"
        >
          Projects Assigned
        </Link>
        <Link
          to={`/${reviewerEmail}/reviewer-dashboard/announcements`}
          className="flex text-xl text-white"
        >
          Announcements
        </Link>
      </div>

      <div className="flex items-center mt-8">
        <button
          onClick={() => handleLogout()}
          className=" rounded-md px-8 py-3 border-none bg-white text-xl text-[#981F2A] shadow-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ReviewerSidebar;
