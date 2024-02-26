import React from "react";
import AdminSidebar from "../../components/admin/adminSidebar";
import AnnouncementsAdmin from "../../components/admin/announcementsAdmin";

const AnnouncementsPage = () => {
  return (
    <div className="flex flex-row w-full h-screen">
      <div className="flex w-[20%] min-h-screen">
        <AdminSidebar />
      </div>
      <div className="flex w-[80%] justify-center items-center">
        <AnnouncementsAdmin />
      </div>
    </div>
  );
};

export default AnnouncementsPage;
