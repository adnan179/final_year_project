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
      <div className="flex w-[80%] h-screen ">
        <div className="flex flex-col w-full min-h-screen px-8 py-4 bg-white gap-2">
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
                <div className="w-[350px] h-[4rem] flex flex-row justify-between items-center px-5 border bg-[#E5DFDF]  shadow-xl rounded-lg">
                  <h2 className="text-[25px] font-semibold font-poppins">
                    {p}
                  </h2>
                  <img src={folder} alt="icon" className="w-[5rem] h-[5rem]" />
                </div>
              </Link>
            ))
          ) : (
            <p className="flex justify-center items-center h-screen text-black font-medium font-poppins text-lg">
              No projects assigned yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignedProjectsPage;
