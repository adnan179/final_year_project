import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { BlackLeftArrow } from "../../lib/leftArrow";
import {
  ReviewerPopUp,
  StudentPopup,
  GuidePopup,
  handlePopup,
  FilePopup,
  GradeCardPopup,
  ProjectFeedback,
} from "../../lib/popUps";
import ReviewerSidebar from "./reviewerSidebar";

const ReviewerAssignedtDetails = () => {
  const { projectNumber, reviewerEmail } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guide, setGuide] = useState(null);
  const [students, setStudents] = useState([]);
  const [reviewerPopup, setReviewerPopup] = useState(false);
  const [guidePopup, setGuidePopup] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filesPopup, setFilesPopup] = useState(false);
  const [gradePopup, setGradePopup] = useState(false);
  const [feedBackPopup, setFeedBackPopup] = useState(false);

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
        handlePopup("successfully fetched the project information", "success");
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error in fetching the project details: ", err);
        handlePopup("error fetching the project information", "error");
        setLoading(false);
      });
  }, [projectNumber]);

  //func to select a student
  const handleStudentClick = (student) => {
    setSelectedStudent(student);
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
        <div className="flex flex-row  pt-5 pl-5 items-center gap-4">
          <Link
            to={`/${reviewerEmail}/reviewer-dashboard/projectsAssigned`}
            className="flex cursor-pointer"
          >
            <BlackLeftArrow />
          </Link>
          <h1 className="text-[40px] text-black font-poppins font-bold">
            {project.projectNumber}
          </h1>
          <button
            onClick={() => setGradePopup(true)}
            className="px-4 py-2 rounded shadow border border-[#981F2A] bg-white text-[#981F2A] font-medium transition duration-300 ease-in-out hover:bg-[#981F2A] hover:text-white"
          >
            Grade card
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

            {/* Documents and feedbacks */}
            <div className="flex flex-col gap-2">
              <div
                onClick={() => setFilesPopup(true)}
                className="flex bg-[#E5DFDF] px-4 py-2 items-center justify-start rounded font-poppins font-medium text-lg text-black"
              >
                Documents
              </div>
              <div
                onClick={() => setFeedBackPopup(true)}
                className="flex bg-[#E5DFDF] px-4 py-2 items-center justify-start font-poppins font-medium text-lg text-black"
              >
                Review Feedbacks
              </div>
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
      {/* files popup jsx */}
      {filesPopup && (
        <FilePopup
          projectNumber={project.projectNumber}
          onCancel={() => setFilesPopup(false)}
        />
      )}
      {/* Gradecard popup JSX */}
      {gradePopup && (
        <GradeCardPopup
          project={project}
          students={students}
          onCancel={() => setGradePopup(false)}
        />
      )}
      {feedBackPopup && (
        <ProjectFeedback
          project={project}
          onCancel={() => setFeedBackPopup(false)}
        />
      )}
    </div>
  );
};

export default ReviewerAssignedtDetails;
