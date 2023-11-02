import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserSidebar from "../../components/users/usersSidebar";

const StudentDashboard = () => {
  const [project, setProject] = useState([]);
  const { userEmail } = useParams();

  const fetchProject = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/student/${userEmail}/project`
      );
      if (response.status === 200) {
        console.log(response.data);
        setProject(response.data);
      } else {
        console.log("failed to fetch the project data");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchProject();
  });
  return (
    <div className="flex flex-row w-full h-screen bg-gradient-to-r from-[#111111] to-[#2C3E50]">
      <div className="flex w-[20%] h-full">
        <UserSidebar />
      </div>
      <div className="text-white font-bold font-poppins text-6xl flex w-[80%] h-full justify-center items-center">
        <div className="flex w-[80%] h-screen">
          <div className="text-white">{project.projectNumber}</div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
