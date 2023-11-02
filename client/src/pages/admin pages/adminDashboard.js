import React from "react";
import AdminSidebar from "../../components/admin/adminSidebar";

const AdminDashboard = () => {
  return (
    <div className="flex flex-row w-full h-screen bg-gradient-to-r from-[#111111] to-[#2C3E50]">
      <div className="flex w-[20%] h-full">
        <AdminSidebar />
      </div>
      <div className="text-white font-bold font-poppins text-6xl flex w-[80%] h-full justify-center items-center">
        <h1>Welcome Admin!!</h1>
      </div>
    </div>
  );
};

export default AdminDashboard;
