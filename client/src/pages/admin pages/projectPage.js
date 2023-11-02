import React from "react";

//components
import AdminSidebar from "../../components/admin/adminSidebar";
import ProjectCards from "../../components/admin/projectCards";

const ProjectPage = () => {
  return (
    <div className="flex flex-row w-full h-screen bg-gradient-to-r from-[#111111] to-[#2C3E50]">
      <div className="flex w-[20%] h-screen">
        <AdminSidebar />
      </div>
      <div className="flex w-[80%] h-screen">
        <ProjectCards />
      </div>
    </div>
  );
};

export default ProjectPage;
