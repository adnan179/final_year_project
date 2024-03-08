import React from "react";
import { Link, useParams } from "react-router-dom";
import profile from "../../assets/profile.png";
import Logout from "../../lib/logout";

const AdminSidebar = () => {
  const handleLogout = Logout();
  const { adminEmail } = useParams();
  return (
    <div
      className="flex flex-col h-screen w-full justify-between items-center py-10 border-r-0
      rounded-sm shadow-md bg-[#981F2A]"
    >
      <div className="flex flex-col gap-2">
        <div className="w-[7rem] h-[7rem] rounded-full items-center mt-8">
          <img src={profile} alt="profile pic" className="w-full h-full" />
        </div>
        <h2 className="text-white text-lg">Welcome Admin</h2>
      </div>

      <div className="flex flex-col mt-5 gap-5">
        <Link
          to={`/${adminEmail}/admin-dashboard/projects`}
          className="flex text-xl text-white"
        >
          Projects
        </Link>
        <Link
          to={`/${adminEmail}/admin-dashboard/reviewers`}
          className="flex text-xl text-white"
        >
          Reviewers
        </Link>
        <Link
          to={`/${adminEmail}/admin-dashboard/announcements`}
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

export default AdminSidebar;
