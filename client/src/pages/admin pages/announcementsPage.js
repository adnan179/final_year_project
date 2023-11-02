import React from "react";
import AdminSidebar from "../../components/admin/adminSidebar";

const AnnouncementsPage = () => {
  return (
    <div className="flex flex-row w-full h-screen bg-gradient-to-r from-[#111111] to-[#2C3E50]">
      <div className="flex w-[20%] min-h-screen">
        <AdminSidebar />
      </div>
      <div className="flex w-[80%] h-full justify-center items-center">
        <h1 className="text-white font-poppins text-5xl">AnnounmentsPage</h1>
      </div>
    </div>
  );
};

export default AnnouncementsPage;
