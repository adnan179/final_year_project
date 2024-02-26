import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GuidePopup,
  ReviewerPopUp,
  StudentPopup,
  handlePopup,
  ConfirmationPopup,
} from "../../lib/popUps";
import UserSidebar from "../../components/users/usersSidebar";
import axios from "axios";

const Dashboard = () => {
  const { userEmail } = useParams();
  const [project, setProject] = useState(null);
  const [guide, setGuide] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviewerPopup, setReviewerPopup] = useState(false);
  const [guidePopup, setGuidePopup] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [deleteFiles, setDeleteFiles] = useState();
  //fetching the project using the projectNumber
  const projectNumber = localStorage.getItem("projectNumber");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/projects/by-number/${projectNumber}`
        );
        const data = response.data;
        const project = data.project; // Extract the project data
        const guide = data.guide; // Extract the guide data
        const students = data.students; // Extract the students data
        setProject(project);
        setGuide(guide);
        setStudents(students);
        setLoading(false);
        handlePopup("Successfully fetched the dashboard", "success");
      } catch (err) {
        console.log("Error in fetching the project details: ", err);
        setLoading(false);
        handlePopup("error fetching the dashboard", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [projectNumber]);

  //func to select a student
  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  // Fetch files from Firebase project folder
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/files/${projectNumber}/files`
        );
        const data = response.data;
        setFiles(data.files);
        setLoading(false);
        handlePopup("successfully fetched all files", "success");
      } catch (error) {
        console.error("Error fetching files:", error);
        setLoading(false);
        handlePopup("error fetching files:", "error");
      }
    };
    fetchFiles();
  }, [projectNumber]);

  //func to handle file change in the input tag
  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  //func to upload the files
  const handleUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("files", selectedFiles[i]);
      }

      await axios.post(
        `http://localhost:4000/files/${userEmail}/${projectNumber}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSelectedFiles([]);
      setLoading(false);
      window.location.reload();
      handlePopup("successfully uploaded the files", "success");
    } catch (error) {
      console.error("Error uploading files:", error);
      setSelectedFiles([]);
      setLoading(false);
      handlePopup("error uploading the files", "error");
    } finally {
      setLoading(false);
    }
  };
  // Function to delete file
  const handleDeleteFile = async (fileName) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:4000/files/${projectNumber}/delete/${fileName}`
      );

      if (response.status === 200) {
        setLoading(false);
        handlePopup("File deleted successfully", "success");
        window.location.reload();
      } else {
        setLoading(false);
        handlePopup("Error deleting file", "error");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      setLoading(false);
      handlePopup("Error deleting file", "error");
    } finally {
      setLoading(false);
    }
  };

  //loading animation
  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-100">
        <div className="flex flex-col p-16 bg-white gap-3 rounded-xl shadow shadow-white">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#981F2A]"></div>
        </div>
      </div>
    );
  }
  return (
    // wholepage
    <div className="flex flex-row w-full min-h-screen">
      {/* sidebar */}
      <div className="flex h-full w-[20%]">
        <UserSidebar projectNumber={projectNumber} />
      </div>
      {/* main section */}
      <div className="flex flex-col h-full w-[80%]">
        {/* first section */}
        <div className="flex flex-row w-full px-10 py-10 items-center justify-center gap-1 rounded-xl shadow-md">
          {/* projectNumber */}
          <div className="flex flex-col w-[15rem] gap-1 p-4 font-medium font-poppins text-md text-white bg-[#981F2A] rounded-xl uppercase">
            <h1>{project && project.projectNumber}</h1>
            <h1>{project && project.title}</h1>
          </div>
          <div className="flex flex-col w-[15rem] gap-2 font-medium font-poppins text-md text-white">
            <div
              onClick={() => setGuidePopup(true)}
              className="w-full bg-[#981F2A] p-3 rounded-xl  cursor-pointer transition duration-300 ease-in-out hover:scale-105"
            >
              Guide: {guide && guide.name}
            </div>

            {project && project.reviewer[0] ? (
              <div
                onClick={() => setReviewerPopup(true)}
                className="w-full bg-[#981F2A] p-3 rounded-xl cursor-pointer transition duration-300 ease-in-out hover:scale-105"
              >
                Reviewer: {project.reviewer[0]}{" "}
              </div>
            ) : (
              <p className="w-full bg-[#981F2A] p-3 rounded-xl text-sm">
                Reviewer will be assigned soon
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 gap-1 text-white text-xs font-medium font-poppins">
            {students &&
              students.map((student, index) => (
                <div
                  key={index}
                  onClick={() => handleStudentClick(student)}
                  className="student-container cursor-pointer transition duration-300 ease-in-out hover:scale-105"
                >
                  {student.name}
                </div>
              ))}
          </div>
          {/* review dates */}
          <div className="flex flex-col w-[15rem] gap-2 font-medium font-poppins text-sm text-white">
            <div className="w-full bg-[#981F2A] p-3 rounded-xl cursor-pointer transition duration-300 ease-in-out hover:scale-105">
              Start Date:
              {project && project.reviewDate && project.reviewDate.startDate}
            </div>
            <div className="w-full bg-[#981F2A] p-3 rounded-xl cursor-pointer transition duration-300 ease-in-out hover:scale-105">
              End Date:{" "}
              {project && project.reviewDate && project.reviewDate.endDate}
            </div>
          </div>
        </div>
        {/* end of first section */}
        {/* start of second section() */}
        <div className="flex w-full justify-between items-center px-16 mt-5">
          <div className="flex text-black/80 text-xl font-medium font-poppins">
            <h1>Files</h1>
          </div>
          <div className="flex">
            <input
              type="file"
              multiple
              onChange={(e) => handleFileChange(e)}
              className="px-4 py-2 font-medium text-white bg-[#981F2A] cursor-pointer rounded-lg"
            />
            {selectedFiles.length > 0 && (
              <button
                onClick={handleUpload}
                className="ml-4 px-4 py-2 font-medium text-white bg-[#981F2A] transition duration-300 ease-in-out hover:scale-105 cursor-pointer rounded-lg"
              >
                Upload
              </button>
            )}
          </div>
        </div>
        {/* files table */}
        <div className="flex flex-col gap-1 w-full px-16 mt-3">
          {/* headings */}
          <div className="grid grid-cols-6 gap-2 w-full text-gray-600 text-lg font-light font-poppins">
            <h2>File Name</h2>
            <h2>Size</h2>
            <h2>Uploaded by</h2>
            <h2>Uploaded at</h2>
            <h2>Type</h2>
            <div></div>
          </div>
          {/* line */}
          <div className="w-full h-[1.5px] rounded bg-gray-600"></div>
          {/* files */}
          {/* Files */}
          {files.length > 0 ? (
            files.map((file, index) => (
              <div
                key={index}
                className="mt-2 grid grid-cols-6 gap-2 w-full text-gray-500 text-sm font-light font-poppins"
              >
                <a download={file.fileName} href={file.downloadURL}>
                  {file.fileName}
                </a>
                <h2>{file.size}</h2>
                <h2>{file.uploadedBy}</h2>
                <h2>{file.uploadedAt}</h2>
                <h2>{file.fileType}</h2>
                <h2
                  onClick={() => {
                    setConfirm(true);
                    setDeleteFiles(file.fileName);
                  }}
                  className="hover:text-red-600 font-medium cursor-pointer"
                >
                  Delete
                </h2>
              </div>
            ))
          ) : (
            <div className="mt-2 w-full text-gray-500 text-md font-light font-poppins">
              No files uploaded yet
            </div>
          )}
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
      {/* Confirmation pop-up */}
      {confirm && (
        <ConfirmationPopup
          message="Are you sure you want to delete this project?"
          onCancel={() => setConfirm(false)} // Close the confirmation pop-up
          onConfirm={() => handleDeleteFile(deleteFiles)} // Call the handleDelete function on confirmation
        />
      )}
    </div>
  );
};

export default Dashboard;
