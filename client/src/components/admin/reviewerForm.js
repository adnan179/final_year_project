import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { handlePopup } from "../../lib/popUps";
import { BlackLeftArrow } from "../../lib/leftArrow";
import AdminSidebar from "./adminSidebar";

const ReviewerForm = () => {
  const { adminEmail } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [reviewersData, setReviewersData] = useState([]);
  const [selectedReviewer, setSelectedReviewer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsResponse = await axios.get(
          "http://localhost:4000/projects/getProjects"
        );
        setProjects(projectsResponse.data.projects);
        handlePopup("successfully fetched projects", "success");
      } catch (error) {
        console.log("Error occured while fetching the reviewer's data", error);
      }
    };
    fetchData();
  }, []);

  //function to add reviewer
  const handleAddReviewer = (e) => {
    //checking if guide is already associated with this project or not
    const selectedReviewerId = e.target.value;
    const selectedReviewer = reviewersData.find(
      (reviewer) => reviewer._id === selectedReviewerId
    );

    if (
      selectedReviewer &&
      selectedReviewer.projects.includes(selectedProject?.projectNumber)
    ) {
      handlePopup("Already associated with this project", "error");
    } else {
      setSelectedReviewer(selectedReviewer);
    }
  };

  const handleProjectSelection = async (e) => {
    const selectedProjectNumber = e.target.value;
    const selectedProject = projects.find(
      (p) => p.projectNumber === selectedProjectNumber
    );

    setSelectedProject(selectedProject);
    try {
      const reviewersResponse = await axios.get(
        `http://localhost:4000/reviewers/getReviewers/${selectedProject.domain}`
      );
      setReviewersData(reviewersResponse.data.reviewers);
      if (reviewersData) {
        handlePopup("successfully fetched reviewers", "success");
      }
    } catch (error) {
      console.log("Error fetching reviewers", error);
      handlePopup("error fetching reviewers", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedReviewerId = selectedReviewer._id;
      if (!selectedProject) {
        handlePopup("Please select a project number", "error");
        return;
      }
      if (!selectedReviewer) {
        handlePopup("please select a reviewer", "error");
        return;
      }

      // Send a request to your server to update the reviewer's projects array
      const response = await axios.post(
        `http://localhost:4000/reviewers/assign-project/${selectedReviewerId}`,
        {
          projectNumber: selectedProject.projectNumber,
        }
      );
      if (!response) {
        handlePopup(response.message, "error");
        return;
      }
      setSelectedReviewer(null);
      setSelectedProject(null);
      navigate(`/${adminEmail}/admin-dashboard/reviewers`);
    } catch (error) {
      console.error("Error assigning project:", error);
      handlePopup("Error assigning project", "error");
    }
  };

  return (
    <div className="flex flex-row w-full h-screen">
      <div className="flex w-[20%] h-screen">
        <AdminSidebar />
      </div>

      <div className="flex flex-col w-[80%] p-10">
        <div className="flex flex-row pb-10 items-center">
          <Link
            to={`/${adminEmail}/admin-dashboard/reviewers`}
            className="flex cursor-pointer"
          >
            <BlackLeftArrow />
          </Link>
          <h1 className="text-black font-poppins font-bold text-xl">
            Reviewer assigning Form
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full bg-black/90 rounded-md shadow shadow-white px-8 py-5 overflow-y-auto"
        >
          {/* Project Number */}
          <div className="flex flex-col gap-3 mt-4">
            <label
              htmlFor="projectNumber"
              className="text-white font-sanista text-lg font-medium"
            >
              project Number
            </label>
            <select
              value={selectedProject?.projectNumber || ""}
              className="bg-[#E5DFDF] px-4 py-2 rounded"
              onChange={handleProjectSelection}
            >
              <option value="">Select Project</option>
              {projects &&
                projects.map((p) => (
                  <option value={p.projectNumber} key={p.projectNumber}>
                    {p.projectNumber}
                  </option>
                ))}
            </select>
            {selectedProject && (
              <p className="text-white text-md">
                Project domain is:{" "}
                <span className="text-red-600 font-medium">
                  {selectedProject.domain}
                </span>
              </p>
            )}
          </div>
          <div className="mt-7">
            <h1 className="text-xl text-white font-sanista">Select Reviewer</h1>
            <div className="inline-block w-full h-[1.5px] mt-2 bg-white px-4"></div>
            <div className="flex mt-2">
              <select
                value={selectedReviewer}
                className="bg-[#E5DFDF] flex px-4 py-2 rounded"
                onChange={handleAddReviewer}
              >
                <option value="">Select reviewer</option>
                {projects &&
                  reviewersData.map((reviewer) => (
                    <option value={reviewer._id} key={reviewer._id}>
                      {reviewer.name}-{reviewer.employeeId}-
                      {reviewer && reviewer.domains.map((d) => <p>{d} </p>)}
                    </option>
                  ))}
              </select>
            </div>
            {/* Display reviewer details or error message */}
            {selectedReviewer && (
              <div className="mt-3 flex">
                {selectedReviewer.projects.includes(
                  selectedProject?.projectNumber
                ) ? (
                  <p className="text-red-600">
                    {selectedReviewer.name} is already associated with this
                    project.
                  </p>
                ) : (
                  <div className="px-4 py-1 bg-[#E5DFDF] flex flex-row gap-3 rounded items-center">
                    <p className="text-black font-sanista">
                      {selectedReviewer.name} - {selectedReviewer.employeeId}
                    </p>
                    {selectedReviewer.projects.length > 0 && (
                      <p className="text-red-600 font-medium">
                        The reviewer is already assigned to:{" "}
                        {selectedReviewer.projects[0]}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="flex px-4 py-2 rounded bg-[#981F2A] text-white mt-7"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewerForm;
