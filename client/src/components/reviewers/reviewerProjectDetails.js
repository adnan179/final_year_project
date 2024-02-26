import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import folder from "../../assets/blue_folder.png";
import { BlackLeftArrow } from "../../lib/leftArrow";
import {
  handlePopup,
  ConfirmationPopup,
  ReviewerPopUp,
  StudentPopup,
  GuidePopup,
} from "../../lib/popUps";
import ReviewerSidebar from "./reviewerSidebar";

const ReviewerProjectDetails = () => {
  const Navigate = useNavigate();
  const { projectNumber, reviewerEmail } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guide, setGuide] = useState(null);
  const [students, setStudents] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false); // State for controlling the confirmation pop-up
  const [reviewerPopup, setReviewerPopup] = useState(false);
  const [guidePopup, setGuidePopup] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    // Function to fetch the project
    axios
      .get(`http://localhost:4000/projects/by-number/${projectNumber}`)
      .then((response) => {
        const data = response.data;
        const project = data.project; // Extract the project data
        const guide = data.guide; // Extract the guide data
        const students = data.students; // Extract the students data
        setProject(project);
        setGuide(guide);
        setStudents(students);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error in fetching the project details: ", err);
        setLoading(false);
      });
  }, [projectNumber]);

  //func to select a student
  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const handleDelete = async () => {
    try {
      setShowConfirmation(false); // Close the confirmation pop-up
      setLoading(true);
      await axios.delete(`http://localhost:4000/projects/${projectNumber}`);
      console.log("Project deleted successfully.");
      handlePopup("Project deleted successfully", "success");
      Navigate(`/${reviewerEmail}/admin-dashboard/projects`);
    } catch (error) {
      console.log("Error deleting project: ", error);
      handlePopup("Error deleting project", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    // Display loading spinner while waiting for the form submission
    return (
      <div className="flex flex-row w-full h-screen">
        <div className="flex w-[20%] h-screen">
          <ReviewerSidebar />
        </div>
        <div className="flex w-[80%] h-screen justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#981F2A]"></div>
        </div>
      </div>
    );
  }

  if (!project?.projectNumber) {
    return (
      <div className="flex flex-row w-full h-screen">
        <div className="flex w-[20%] min-h-screen overflow-y-hidden">
          <ReviewerSidebar />
        </div>
        <div className="flex flex-col w-[80%] h-screen py-5 px-5 justify-center items-center">
          <Link
            to={`/${reviewerEmail}/admin-dashboard/projects`}
            className="flex cursor-pointer text-[#981F2A] text-xl"
          >
            Back to projects
          </Link>
          <h1 className="text-[40px] text-black font-poppins font-bold">
            404 Error
          </h1>
          <h1 className="text-[30px] text-black font-poppins font-medium">
            Project Not Found!!
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row w-full h-screen">
      <div className="flex w-[20%] h-screen overflow-y-hidden">
        <ReviewerSidebar />
      </div>
      {/* second cont */}
      <div className="flex flex-col w-[80%] h-screen py-2 px-5 pb-20 overflow-y-auto">
        {/* heading */}
        <div className="flex flex-row  pt-5 pl-5 items-center">
          <Link
            to={`/${reviewerEmail}/reviewer-dashboard/projects`}
            className="flex cursor-pointer"
          >
            <BlackLeftArrow />
          </Link>
          <h1 className="text-[40px] text-black font-poppins font-bold">
            {project.projectNumber}
          </h1>
          <button
            onClick={() => setShowConfirmation(true)} // Set showConfirmation to true to display the confirmation pop-up
            className="px-4 py-2 rounded-lg text-white bg-[#981F2A] font-bold ml-10 cursor-pointer"
          >
            Delete
          </button>
        </div>
        {/* project,guide,chat, documents */}
        <div className="flex flex-col mt-[50px] px-[50px] gap-5">
          {/* project details */}
          <div className="flex flex-row gap-10 cursor-pointer">
            <div className="flex flex-col text-black text-xl font-medium font-poppins gap-4 w-[300px]">
              <h2>{project.title}</h2>
              <h2>{project.domain}</h2>
              <p className="text-sm">Description:{project.description}</p>
              {project.reviewer[0] ? (
                <div
                  className="text-sm text-blue-700 font-poppins font-medium cursor-pointer"
                  onClick={() => setReviewerPopup(true)}
                >
                  Reviewer: {project.reviewer[0]}
                </div>
              ) : (
                <p className="text-sm text-blue-700 font-medium">
                  Reviewer: reviewer will be assigned soon
                </p>
              )}

              <p className="text-sm">
                Review start Date:{" "}
                {project.reviewDate?.startDate
                  ? project.reviewDate?.startDate
                  : "Review date will be posted soon"}
              </p>
              <p className="text-sm">
                Review end Date:{" "}
                {project.reviewDate?.endDate
                  ? project.reviewDate?.endDate
                  : "Review date will be posted soon"}
              </p>
            </div>
            {/* Guide details */}
            <div
              onClick={() => setGuidePopup(true)}
              className="flex flex-col justify-center items-center gap-5 w-[200px] h-[250px] bg-[#E5DFDF] 
              rounded-md shadow-md cursor-pointer"
            >
              <div className="font-bold text-2xl text-black font-poppins">
                Guide
              </div>
              <div className="w-[5rem] h-[5rem] rounded-full flex bg-black"></div>
              <h2 className="font-medium text-xl font-poppins">{guide.name}</h2>
              <p className="font-medium font-poppins">{guide.employeeId}</p>
            </div>

            {/* Documents */}
            <div className="flex flex-col items-center cursor-pointer">
              <img
                src={folder}
                alt="documents"
                className="w-[250px] h-[250px]"
              />
              <h1 className="flex font-poppins font-medium text-lg text-black mt-[-40px]">
                Documents
              </h1>
            </div>
          </div>
        </div>

        {/* Students details */}
        <div className="flex flex-col mt-[10px] px-[50px] gap-5">
          {/* team details */}
          <div className="font-bold text-xl text-white font-poppins">Team</div>
          <div className="flex flex-row gap-16">
            {students &&
              students.map((student) => (
                <div
                  onClick={() => handleStudentClick(student)}
                  className="flex flex-col justify-center items-center gap-5 w-[200px] h-[250px] bg-[#E5DFDF] 
                  rounded-md shadow-xl cursor-pointer"
                >
                  <div className="w-[5rem] h-[5rem] rounded-full flex bg-black"></div>
                  <h2 className="font-medium text-xl font-poppins">
                    {student.name}
                  </h2>
                  <p className="font-medium font-poppins">
                    {student.rollNumber}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* Confirmation pop-up */}
      {showConfirmation && (
        <ConfirmationPopup
          message="Are you sure you want to delete this project?"
          onCancel={() => setShowConfirmation(false)} // Close the confirmation pop-up
          onConfirm={handleDelete} // Call the handleDelete function on confirmation
        />
      )}
      {/* reviewer details pop-up */}
      {reviewerPopup && (
        <ReviewerPopUp
          reviewerEmployeeId={project.reviewer[0]}
          onCancel={() => setReviewerPopup(false)} // Close the pop up
        />
      )}
      {/* guide details pop-up */}
      {guidePopup && (
        <GuidePopup
          guide={guide}
          onCancel={() => setGuidePopup(false)} // Close the pop up
        />
      )}
      {/* Student popup JSX */}
      {selectedStudent && (
        <StudentPopup
          student={selectedStudent}
          onCancel={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
};

export default ReviewerProjectDetails;
