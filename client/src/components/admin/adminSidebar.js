import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import profile from "../../assets/profile.png";

const AdminSidebar = () => {
  const Navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");

    Navigate("/");
  };
  const { adminEmail } = useParams();
  return (
    <div
      className="flex flex-col h-screen w-full justify-between items-center py-10 border-r-0
      rounded-sm shadow-2xl"
    >
      <div className="w-[7rem] h-[7rem] rounded-full items-center mt-8">
        <img src={profile} alt="profile pic" className="w-full h-full" />
      </div>

      <div className="flex flex-col mt-5 gap-10">
        <Link
          to={`/${adminEmail}/admin-dashboard/projects`}
          className="flex text-3xl text-white"
        >
          Projects
        </Link>
        <Link
          to={`/${adminEmail}/admin-dashboard/reviewers`}
          className="flex text-3xl text-white"
        >
          Reviewers
        </Link>
        <Link
          to={`/${adminEmail}/admin-dashboard/announcements`}
          className="flex text-3xl text-white"
        >
          Announcements
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

export default AdminSidebar;
