import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReviewerSidebar from "../../components/reviewers/reviewerSidebar";
import axios from "axios";
import { handlePopup } from "../../lib/popUps";
import folder from "../../assets/blue_folder.png";

const AssignedProjectsPage = () => {
  const { reviewerEmail } = useParams();
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/reviewers/email/${reviewerEmail}`
        );
        if (response.status === 201) {
          setAssignedProjects(response.data.projects);
          setLoading(false);
          handlePopup("successfully fetched assigned projects", "success");
        }
      } catch (error) {
        console.log("error fetching assigned projects data", error);
        handlePopup("error fetching assigned projects data", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [reviewerEmail]);

  return (
    <div className="flex flex-row w-full min-h-screen">
      <div className="flex w-[20%] h-screen">
        <ReviewerSidebar />
      </div>
      <div className="flex flex-col w-[80%] h-screen ">
        <div className="text-xl font-bold mb-5 pt-10 pl-10">
          <h1>Assigned Projects</h1>
        </div>
        <div className="flex flex-row w-full min-h-screen px-8 py-4 bg-white gap-2">
          {loading && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
              <div className="flex flex-col p-16 bg-white gap-3 rounded-xl shadow shadow-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#981F2A]"></div>
              </div>
            </div>
          )}
          {assignedProjects && assignedProjects.length !== 0 ? (
            assignedProjects.map((p, index) => (
              <Link to={`${p}`} key={index}>
                <div className="w-[200px] h-[200px] flex flex-col justify-center items-center px-5 border bg-[#E5DFDF]  shadow-xl rounded-lg">
                  <img src={folder} alt="icon" className="w-[7rem] h-[7rem]" />
                  <h2 className="text-[25px] font-semibold font-poppins">
                    {p}
                  </h2>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex w-full h-full justify-center items-center text-[#981F2A] font-bold font-poppins text-xl">
              <p>No projects assigned yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignedProjectsPage;
