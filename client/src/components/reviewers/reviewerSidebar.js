import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import profile from "../../assets/profile.png";

const ReviewerSidebar = () => {
  const Navigate = useNavigate();
  const { reviewerEmail } = useParams();
  const handleLogout = () => {
    localStorage.removeItem("token");

    Navigate("/");
  };
  return (
    <div
      className="flex flex-col h-screen w-full justify-between items-center py-10 border-r-0
      rounded-sm shadow-2xl"
    >
      <div className="flex flex-col text-white gap-5 items-center">
        <div className="w-[7rem] h-[7rem] rounded-full items-center mt-8">
          <img src={profile} alt="profile pic" className="w-full h-full" />
        </div>
      </div>

      <div className="flex flex-col mt-5 gap-2">
        <Link
          to={`/${reviewerEmail}/reviewer-dashboard/projects`}
          className="flex text-3xl text-white"
        >
          Projects
        </Link>
      </div>

      <div className="flex items-center mt-8">
        <button
          onClick={() => handleLogout()}
          className=" rounded-md px-8 py-3 border-none bg-blue-600 text-2xl text-white shadow-2xl shadow-blue-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ReviewerSidebar;
