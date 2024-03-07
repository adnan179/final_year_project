import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ReviewOneData, ReviewTwoData, ReviewThreeData } from "./data";

//popup for success and error messages
export const handlePopup = (message, type) => {
  if (type === "success") {
    toast.success(message);
  } else {
    toast.error(message);
  }
};

//popup for student details
export const StudentPopup = ({ student, onCancel }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-16 rounded-lg shadow-lg">
        <p className="text-lg font-semibold">Name: {student && student.name}</p>
        <p className="text-lg font-semibold">
          Roll number: {student && student.rollNumber}
        </p>
        <p className="text-lg font-semibold">
          Email: {student && student.email}
        </p>
        <p className="text-lg font-semibold">
          Phone number {student && student.phoneNumber}
        </p>
        <p className="text-lg font-semibold">
          Department: {student && student.department}
        </p>
        <p className="text-lg font-semibold">
          Branch: {student && student.branch}
        </p>

        <div className="mt-5 flex justify-center">
          <button
            onClick={() => onCancel()}
            className=" flex px-4 py-2 bg-gray-300 text-gray-800 rounded
            hover:bg-[#981F2A] hover:text-white transition duration-300 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

//popup for Guide details
export const GuidePopup = ({ guide, onCancel }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-16 rounded-lg shadow-lg">
        <p className="text-lg font-semibold">Name: {guide && guide.name}</p>
        <p className="text-lg font-semibold">
          EmployeeId: {guide && guide.employeeId}
        </p>
        <p className="text-lg font-semibold">
          Email:
          {guide && guide.email}
        </p>
        <p className="text-lg font-semibold">
          Cabin number: {guide && guide.officeNumber}
        </p>
        <p className="text-lg font-semibold">
          Phone number: {guide && guide.phoneNumber}
        </p>
        <p className="text-lg font-semibold">
          Designation: {guide && guide.designation}
        </p>
        <p className="text-lg font-semibold">
          Projects Handling:{" "}
          {guide &&
            guide.projects.map((p) => (
              <p className="text-md font-medium text-[#981F2A]">{p}</p>
            ))}
        </p>

        <div className="mt-5 flex justify-center">
          <button
            onClick={() => onCancel()}
            className="flex px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-[#981F2A] hover:text-white
            transition duration-300 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
//popup for reviewer details
export const ReviewerPopUp = ({ reviewerEmployeeId, onCancel }) => {
  const [reviewerData, setReviewerData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:4000/reviewers/${reviewerEmployeeId}`
        );
        setReviewerData(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (err) {
        console.log("Error:", err);
        handlePopup("eror fetching the data", "error");
        setLoading(false);
        onCancel();
      }
    };
    fetchData();
  }, [reviewerEmployeeId, onCancel]);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#981F2A]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-16 rounded-lg shadow-lg">
        <p className="text-lg font-semibold">
          Name: {reviewerData && reviewerData.name}
        </p>
        <p className="text-lg font-semibold">
          EmployeeId: {reviewerData && reviewerData.employeeId}
        </p>
        <p className="text-lg font-semibold">
          Cabin number: {reviewerData && reviewerData.cabinNumber}
        </p>
        <p className="text-lg font-semibold">
          Phone number: {reviewerData && reviewerData.phoneNumber}
        </p>
        <p className="text-lg font-semibold">
          Designation: {reviewerData && reviewerData.designation}
        </p>
        <p className="text-lg font-semibold">
          Domains:
          {reviewerData &&
            reviewerData.domains.map((d) => (
              <p className="text-xs font-medium text-[#981F2A]">{d}</p>
            ))}
        </p>
        <div className="mt-5 flex justify-center">
          <button
            onClick={() => onCancel()}
            className="flex px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-[#981F2A] hover:text-white
            transition duration-300 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

//popup for confirmation messages
export const ConfirmationPopup = ({ message, onCancel, onConfirm }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <p className="text-lg font-semibold">{message}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md mr-4 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-white text-[#981F2A] rounded-md hover:bg-[#981F2A] hover:text-white transition ease-in-out delay-[0.5]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

//popup for reviewer details and admin access to it
export const AdminReviewerPopup = ({ reviewer, onCancel }) => {
  const [reviewerData, setReviewerData] = useState(reviewer); //state to store reviewer value even after editing it
  const [showConfirmation, setShowConfirmation] = useState(false); //state for showing confirmation popup for deleting the reviewer
  const [loading, setLoading] = useState(false); //state value for loading animation
  const [edit, setEdit] = useState(false); //state which handles delete btns for projects array

  //func to delete a project from projects array
  const handleDeleteProject = async (p) => {
    setLoading(true);
    try {
      // Update reviewer with the updated projects array
      const response = await axios.patch(
        `http://localhost:4000/reviewers/${reviewerData.employeeId}/project/${p}`
      );
      if (response.status === 200) {
        setReviewerData(response.data.reviewer);
        handlePopup("Project deleted successfully", "success");
        setLoading(false);
      }
    } catch (error) {
      console.log("Error deleting project:", error);
      console.log(reviewerData.employeeId);
      handlePopup("Error deleting project", "error");
    } finally {
      setLoading(false);
    }
  };

  //func to delete reviewer from the database
  const handleDelete = async () => {
    try {
      setShowConfirmation(false); // Close the confirmation pop-up
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:4000/reviewers/${reviewerData.employeeId}`
      );
      if (response.status === 200) {
        setLoading(false);
        onCancel();
        window.location.reload();
        handlePopup("Reviewer deleted successfully", "success");
      }
    } catch (error) {
      console.log("Error deleting reviewer: ", error);
      handlePopup("Error deleting reviewer", "error");
    } finally {
      setLoading(false);
    }
  };

  // loading animation
  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
        <div className="flex flex-col p-16 bg-white gap-3 rounded-xl shadow shadow-white">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#981F2A]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="flex flex-col p-16 bg-white gap-3 rounded-xl shadow shadow-white">
        <h2 className="font-medium font-poppins text-black text-xl">
          Name: {reviewerData && reviewerData.name}
        </h2>
        <h2 className="font-medium font-poppins text-black text-xl">
          EmployeeId: {reviewerData && reviewer.employeeId}
        </h2>
        <h2 className="font-medium font-poppins text-black text-xl">
          Email: {reviewerData && reviewerData.email}
        </h2>
        <h2 className="font-medium font-poppins text-black text-xl">
          Phone Number: {reviewerData && reviewerData.phoneNumber}
        </h2>
        <h2 className="font-medium font-poppins text-black text-xl">
          Cabin Number: {reviewerData && reviewerData.cabinNumber}
        </h2>
        <h2 className="font-medium font-poppins text-black text-xl">
          projects:{" "}
          {reviewerData &&
            reviewerData.projects.map((p, index) => (
              <div className="flex flex-row gap-3">
                <p key={index} className="text-[#981F2A] text-md font-medium">
                  {p}
                </p>
                {edit && (
                  <button
                    className="hover:text-[#981F2A] cursor-pointer font-medium font-poppins text-sm"
                    onClick={() => handleDeleteProject(p)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
        </h2>
        {reviewerData && reviewerData.projects.length === 0 && (
          <p className="text-lg text-[#981F2A] font-medium font-poppins">
            Projects yet to assign
          </p>
        )}
        <div className="mt-5 flex flex-row gap-4 justify-center">
          <button
            onClick={() => onCancel()}
            className="flex px-4 py-2 bg-gray-300 text-gray-800 rounded
            transition duration-300 hover:scale-125 font-medium font-poppins"
          >
            Cancel
          </button>
          {reviewerData && reviewerData.projects.length !== 0 && (
            <button
              onClick={() => setEdit(!edit)}
              className="flex px-4 py-2 bg-gray-300 text-[#981F2A] rounded
            transition duration-300 hover:scale-125 font-medium font-poppins"
            >
              Edit
            </button>
          )}

          <button
            onClick={() => setShowConfirmation(true)}
            className="flex px-4 py-2 bg-[#981F2A] text-white rounded
            transition duration-300 hover:scale-125 font-medium font-poppins"
          >
            Delete
          </button>
        </div>
        {showConfirmation && (
          <ConfirmationPopup
            message="Are you sure you want to delete this project?"
            onCancel={() => setShowConfirmation(false)} // Close the confirmation pop-up
            onConfirm={handleDelete} // Call the handleDelete function on confirmation
          />
        )}
      </div>
    </div>
  );
};

//popup for files of a project
export const FilePopup = ({ projectNumber, onCancel }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/files/${projectNumber}/files`
        );
        setFiles(response.data.files);
        handlePopup("successfully fetched the files", "success");
      } catch (error) {
        console.error("Error fetching files:", error);
        handlePopup("Error fetching files", "error");
        onCancel();
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [projectNumber, onCancel]);

  // loading animation
  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
        <div className="flex flex-col p-16 bg-white gap-3 rounded-xl shadow shadow-white">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#981F2A]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Files for {projectNumber}</h2>
        {files.length === 0 ? (
          <div className="flex justify-center items-center">
            <p className="font-medium text-red-600">No files uploaded yet!</p>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="grid grid-cols-5 gap-2 text-black/90 font-medium">
              <p>Name</p>
              <p>Size</p>
              <p>uploadedBy</p>
              <p>uploadedAt</p>
              <p></p>
            </div>
            <div className="flex w-full h-[2px] bg-gray-800 px-4"></div>
          </div>
        )}
        {files &&
          files.map((file, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-2 text-sm text-black"
            >
              <p>{file.fileName}</p>
              <p>Size: {file.size} bytes</p>
              <p>Uploaded By: {file.uploadedBy}</p>
              <p>Uploaded At: {new Date(file.uploadedAt).toLocaleString()}</p>
              <a
                href={file.downloadURL}
                className="text-[#981F2A] hover:scale-105 ease-in-out transition duration-300 cursor-pointer"
              >
                Download
              </a>
            </div>
          ))}

        <div className="mt-5 flex justify-center">
          <button
            onClick={() => onCancel()}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-[#981F2A] hover:text-white transition duration-300 ease-in-out"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

//grade card popup
export const GradeCardPopup = ({ project, students, onCancel }) => {
  const [addGrade, setAddGrade] = useState(false);
  const [reviewOne, setReviewOne] = useState(false); // 40 marks
  const [reviewTwo, setReviewTwo] = useState(false); // 30 marks
  const [reviewThree, setReviewThree] = useState(false); // 30 marks
  const [feedBack, setFeedBack] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-16 rounded-lg shadow-lg">
        <div className="flex flex-col gap-4 justify-center items-center">
          <h2 className="text-lg font-medium text-black">
            Grade Card for {project.projectNumber}
          </h2>
          {addGrade && (
            <div className="flex flex-col gap-3 justify-center items-center">
              <div className="flex flex-row gap-3">
                <button
                  onClick={() => setReviewOne(true)}
                  className="px-4 py-2 bg-[#981F2A] text-white rounded"
                >
                  Review-1 (40m)
                </button>
                <button
                  onClick={() => setReviewTwo(true)}
                  className="px-4 py-2 bg-[#981F2A] text-white rounded"
                >
                  Review-2 (30m)
                </button>
                <button
                  onClick={() => setReviewThree(true)}
                  className="px-4 py-2 bg-[#981F2A] text-white rounded"
                >
                  Review-3 (30m)
                </button>
              </div>
              <button
                onClick={() => setAddGrade(false)}
                className="px-4 py-2 bg-white text-[#981F2A] transition duration-300 ease-in-out hover:bg-[#981F2A] hover:text-white shadow-lg rounded"
              >
                Cancel
              </button>
            </div>
          )}
          {!addGrade && !feedBack && (
            <div className="overflow-x-auto">
              <table className="table-auto">
                <thead>
                  <tr className="border border-black">
                    <th className="px-4 py-2 font-medium border border-black">
                      Students
                    </th>
                    <th className="px-4 py-2 font-medium border border-black">
                      Review 1(40marks)
                    </th>
                    <th className="px-4 py-2 font-medium border border-black">
                      Review 2(30marks)
                    </th>
                    <th className="px-4 py-2 font-medium border border-black">
                      Review 3(30marks)
                    </th>
                    <th className="px-4 py-2 font-medium border border-black">
                      Total(100marks)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.name}>
                      <td className="border border-black px-4 py-2">
                        {student.name}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {student.review1.totalMarks
                          ? student.review1.totalMarks || 0
                          : "not graded yet"}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {student.review2.totalMarks
                          ? student.review2.totalMarks || 0
                          : "not graded yet"}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {student.review3.totalMarks
                          ? student.review3.totalMarks || 0
                          : "not graded yet"}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {(student.review1
                          ? student.review1.totalMarks || 0
                          : 0) +
                          (student.review2
                            ? student.review2.totalMarks || 0
                            : 0) +
                          (student.review3
                            ? student.review3.totalMarks || 0
                            : 0) || "Not graded yet"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!addGrade && !feedBack && (
            <div className="flex flex-row gap-3">
              <button
                onClick={() => setAddGrade(true)}
                className="px-4 py-2 bg-[#981F2A] text-white transition duration-300 ease-in-out hover:scale-105 shadow-lg rounded"
              >
                Update Grades
              </button>
              <button
                onClick={() => setFeedBack(true)}
                className="px-4 py-2 bg-[#981F2A] text-white transition duration-300 ease-in-out hover:scale-105 shadow-lg rounded"
              >
                Add Feedback
              </button>
              <button
                onClick={() => onCancel()}
                className="flex px-4 py-2 border border-[#981F2A] bg-white text-[#981F2A] transition duration-300 ease-in-out hover:bg-[#981F2A] hover:text-white shadow-lg rounded"
              >
                Close
              </button>
            </div>
          )}
          {feedBack && (
            <FeedBackCard
              project={project}
              onCancel={() => setFeedBack(false)}
            />
          )}
          {reviewOne && (
            <ReviewOneCard
              students={students}
              onCancel={() => setReviewOne(false)}
            />
          )}
          {reviewTwo && (
            <ReviewTwoCard
              students={students}
              onCancel={() => setReviewTwo(false)}
            />
          )}
          {reviewThree && (
            <ReviewThreeCard
              students={students}
              onCancel={() => setReviewThree(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

//popup to add new feedbacks
export const FeedBackCard = ({ project, onCancel }) => {
  const [feedText, setFeedText] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(feedText);
      const response = await axios.post(
        `http://localhost:4000/projects/${project.projectNumber}/feedback`,
        { feedText: feedText }
      );
      if (response.status === 200) {
        handlePopup("successfully submitted the feedback", "success");
        setLoading(false);
        onCancel();
      }
    } catch (err) {
      console.log("Error submitting project feedback", err);
      handlePopup("Error submitting project feedback", "error");
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#981F2A]"></div>
    );
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-start items-center gap-2 px-4"
    >
      <h2 className="text-lg font-medium font-poppins">Feedback form</h2>
      <textarea
        maxLength={600}
        placeholder="Enter the feedback"
        onChange={(e) => setFeedText(e.target.value)}
        value={feedText}
        className="w-[400px] h-[200px] pt-2 pl-2 rounded shadow border outline-none focus:ring-1 focus:ring-[#981F2A]"
      />
      <div className="flex flex-row gap-3">
        <button className="flex px-4 py-2 border border-[#981F2A] bg-white text-[#981F2A] transition duration-300 ease-in-out hover:bg-[#981F2A] hover:text-white shadow-lg rounded">
          Submit
        </button>
        <button
          onClick={() => onCancel()}
          className="px-4 py-2 bg-[#981F2A] text-white transition duration-300 ease-in-out hover:scale-105 shadow-lg rounded"
        >
          Close
        </button>
      </div>
    </form>
  );
};
//popup to check feedbacks of a project
export const ProjectFeedback = ({ project, onCancel }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-100">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <div className="flex flex-col justify-center items-center gap-3">
          <h2 className="font-bold text-xl">
            {project.projectNumber} Feedbacks
          </h2>
          {!project.feedbacks && (
            <p className="text-lg text-red-600">Feedbacks yet to be given!!</p>
          )}
          {project.Feedbacks &&
            project.Feedbacks.map((feedback, index) => (
              <p key={index}>
                feedback-{index + 1}: {feedback}
              </p>
            ))}
          <button
            onClick={() => onCancel()}
            className="flex px-4 py-2 border border-[#981F2A] text-[#981F2A] hover:bg-[#981F2A] hover:text-white transition ease-in-out duration-300 rounded shadow"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

//review-1 marks card
export const ReviewOneCard = ({ students, onCancel }) => {
  // Initialize marks data state for each student
  const initialMarksData = students.map(() =>
    ReviewOneData.map(() => ({ marks: "" }))
  );
  const [marksData, setMarksData] = useState(initialMarksData);

  // Function to handle changes in marks for a student
  const handleMarksChange = (studentIndex, itemIndex, marks) => {
    const updatedMarksData = [...marksData];
    updatedMarksData[studentIndex][itemIndex].marks = marks;
    setMarksData(updatedMarksData);
  };

  // Function to calculate total marks for each student
  const calculateTotalMarks = (studentIndex) => {
    let totalMarks = 0;
    marksData[studentIndex].forEach((item) => {
      totalMarks += parseInt(item.marks) || 0;
    });
    if (totalMarks <= 40) {
      return totalMarks;
    } else {
      handlePopup("Total marks exceed 40");
      return "error";
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Check if any input field is empty for any student
      const isAnyFieldEmpty = marksData.some((studentMarks) =>
        studentMarks.some((item) => item.marks === "")
      );

      if (isAnyFieldEmpty) {
        handlePopup("Please fill in all fields for each student", "error");
        return;
      }

      const review1Data = students.map((student, studentIndex) => ({
        name: student.name,
        totalMarks: calculateTotalMarks(studentIndex),
      }));
      // Make a POST request to send review1 data to the backend
      const response = await axios.post(
        "http://localhost:4000/student/updateReview1",
        review1Data
      );
      if (response.status === 200) {
        handlePopup("successfully updated the review-1 marks", "success");
        onCancel();
      }
    } catch (error) {
      console.error("Error while submitting review1 data:", error);
      handlePopup("Error updating the review-1 marks", "error");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-100">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex flex-col justify-center items-center gap-3">
          <h2 className="text-lg text-black font-medium">Review-1 marks</h2>
          <div className="overflow-x-auto">
            <table className="table-auto text-xs border border-black">
              <thead>
                <tr>
                  <th className="border border-black p-2 font-medium">
                    Student
                  </th>
                  {ReviewOneData &&
                    ReviewOneData.map((item, index) => (
                      <th key={item.column} className="border border-black p-2">
                        {item.column} ({item.marks} marks)
                      </th>
                    ))}
                  <th className="border border-black p-2 font-medium">
                    Total Marks
                  </th>
                </tr>
              </thead>
              <tbody>
                {students &&
                  students.map((student, studentIndex) => (
                    <tr key={student.name}>
                      <td className="border border-black p-2 font-medium text-xs">
                        {student.name}
                      </td>
                      {ReviewOneData &&
                        ReviewOneData.map((item, itemIndex) => (
                          <td
                            key={`${student.name}-${item.column}`}
                            className="border border-black p-2"
                          >
                            <input
                              type="number"
                              value={marksData[studentIndex][itemIndex].marks}
                              onChange={(e) =>
                                handleMarksChange(
                                  studentIndex,
                                  itemIndex,
                                  e.target.value
                                )
                              }
                              className="w-full py-2 border border-black"
                            />
                          </td>
                        ))}
                      <td className="border border-black p-2 font-medium text-red-600">
                        {calculateTotalMarks(studentIndex)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-row gap-3">
            <button
              className="px-4 py-2 bg-[#981F2A] text-white font-medium rounded shadow hover:scale-105"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="px-4 py-2 text-[#981F2A] border border-[#981F2A] font-medium rounded shadow hover:bg-[#981F2A] hover:text-white"
              onClick={() => onCancel()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

//review-2 marks card
export const ReviewTwoCard = ({ students, onCancel }) => {
  // Initialize marks data state for each student
  const initialMarksData = students.map(() =>
    ReviewTwoData.map(() => ({ marks: "" }))
  );
  const [marksData, setMarksData] = useState(initialMarksData);

  // Function to handle changes in marks for a student
  const handleMarksChange = (studentIndex, itemIndex, marks) => {
    const updatedMarksData = [...marksData];
    updatedMarksData[studentIndex][itemIndex].marks = marks;
    setMarksData(updatedMarksData);
  };

  // Function to calculate total marks for each student
  const calculateTotalMarks = (studentIndex) => {
    let totalMarks = 0;
    marksData[studentIndex].forEach((item) => {
      totalMarks += parseInt(item.marks) || 0;
    });
    if (totalMarks <= 30) {
      return totalMarks;
    } else {
      handlePopup("Total marks exceed 30");
      return "error";
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Check if any input field is empty for any student
      const isAnyFieldEmpty = marksData.some((studentMarks) =>
        studentMarks.some((item) => item.marks === "")
      );

      if (isAnyFieldEmpty) {
        handlePopup("Please fill in all fields for each student", "error");
        return;
      }

      const review2Data = students.map((student, studentIndex) => ({
        name: student.name,
        totalMarks: calculateTotalMarks(studentIndex),
      }));
      // Make a POST request to send review1 data to the backend
      const response = await axios.post(
        "http://localhost:4000/student/updateReview2",
        review2Data
      );
      if (response.status === 200) {
        handlePopup("successfully updated the review-1 marks", "success");
        onCancel();
      }
    } catch (error) {
      console.error("Error while submitting review1 data:", error);
      handlePopup("Error updating the review-1 marks", "error");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-100">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex flex-col justify-center items-center gap-3">
          <h2 className="text-lg text-black font-medium">Review-2 marks</h2>
          <div className="overflow-x-auto">
            <table className="table-auto text-xs border border-black">
              <thead>
                <tr>
                  <th className="border border-black p-2 font-medium">
                    Student
                  </th>
                  {ReviewTwoData &&
                    ReviewTwoData.map((item, index) => (
                      <th key={item.column} className="border border-black p-2">
                        {item.column} ({item.marks} marks)
                      </th>
                    ))}
                  <th className="border border-black p-2 font-medium">
                    Total Marks
                  </th>
                </tr>
              </thead>
              <tbody>
                {students &&
                  students.map((student, studentIndex) => (
                    <tr key={student.name}>
                      <td className="border border-black p-2 font-medium text-xs">
                        {student.name}
                      </td>
                      {ReviewTwoData &&
                        ReviewTwoData.map((item, itemIndex) => (
                          <td
                            key={`${student.name}-${item.column}`}
                            className="border border-black p-2"
                          >
                            <input
                              type="number"
                              value={marksData[studentIndex][itemIndex].marks}
                              onChange={(e) =>
                                handleMarksChange(
                                  studentIndex,
                                  itemIndex,
                                  e.target.value
                                )
                              }
                              className="w-full py-2 border border-black"
                            />
                          </td>
                        ))}
                      <td className="border border-black p-2 font-medium text-red-600">
                        {calculateTotalMarks(studentIndex)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-row gap-3">
            <button
              className="px-4 py-2 bg-[#981F2A] text-white font-medium rounded shadow hover:scale-105"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="px-4 py-2 text-[#981F2A] border border-[#981F2A] font-medium rounded shadow hover:bg-[#981F2A] hover:text-white"
              onClick={() => onCancel()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

//review-3 marks card
export const ReviewThreeCard = ({ students, onCancel }) => {
  // Initialize marks data state for each student
  const initialMarksData = students.map(() =>
    ReviewOneData.map(() => ({ marks: "" }))
  );
  const [marksData, setMarksData] = useState(initialMarksData);

  // Function to handle changes in marks for a student
  const handleMarksChange = (studentIndex, itemIndex, marks) => {
    const updatedMarksData = [...marksData];
    updatedMarksData[studentIndex][itemIndex].marks = marks;
    setMarksData(updatedMarksData);
  };

  // Function to calculate total marks for each student
  const calculateTotalMarks = (studentIndex) => {
    let totalMarks = 0;
    marksData[studentIndex].forEach((item) => {
      totalMarks += parseInt(item.marks) || 0;
    });
    if (totalMarks <= 30) {
      return totalMarks;
    } else {
      handlePopup("Total marks exceed 30");
      return "error";
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Check if any input field is empty for any student
      const isAnyFieldEmpty = marksData.some((studentMarks) =>
        studentMarks.some((item) => item.marks === "")
      );

      if (isAnyFieldEmpty) {
        handlePopup("Please fill in all fields for each student", "error");
        return;
      }

      const review3Data = students.map((student, studentIndex) => ({
        name: student.name,
        totalMarks: calculateTotalMarks(studentIndex),
      }));
      // Make a POST request to send review1 data to the backend
      const response = await axios.post(
        "http://localhost:4000/student/updateReview3",
        review3Data
      );
      if (response.status === 200) {
        handlePopup("successfully updated the review-3 marks", "success");
        onCancel();
      }
    } catch (error) {
      console.error("Error while submitting review3 data:", error);
      handlePopup("Error updating the review-3 marks", "error");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-100">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex flex-col justify-center items-center gap-3">
          <h2 className="text-lg text-black font-medium">Review-3 marks</h2>
          <div className="overflow-x-auto">
            <table className="table-auto text-xs border border-black">
              <thead>
                <tr>
                  <th className="border border-black p-2 font-medium">
                    Student
                  </th>
                  {ReviewThreeData &&
                    ReviewThreeData.map((item, index) => (
                      <th key={item.column} className="border border-black p-2">
                        {item.column} ({item.marks} marks)
                      </th>
                    ))}
                  <th className="border border-black p-2 font-medium">
                    Total Marks
                  </th>
                </tr>
              </thead>
              <tbody>
                {students &&
                  students.map((student, studentIndex) => (
                    <tr key={student.name}>
                      <td className="border border-black p-2 font-medium text-xs">
                        {student.name}
                      </td>
                      {ReviewThreeData &&
                        ReviewThreeData.map((item, itemIndex) => (
                          <td
                            key={`${student.name}-${item.column}`}
                            className="border border-black p-2"
                          >
                            <input
                              type="number"
                              value={marksData[studentIndex][itemIndex].marks}
                              onChange={(e) =>
                                handleMarksChange(
                                  studentIndex,
                                  itemIndex,
                                  e.target.value
                                )
                              }
                              className="w-full py-2 border border-black"
                            />
                          </td>
                        ))}
                      <td className="border border-black p-2 font-medium text-red-600">
                        {calculateTotalMarks(studentIndex)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-row gap-3">
            <button
              className="px-4 py-2 bg-[#981F2A] text-white font-medium rounded shadow hover:scale-105"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="px-4 py-2 text-[#981F2A] border border-[#981F2A] font-medium rounded shadow hover:bg-[#981F2A] hover:text-white"
              onClick={() => onCancel()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
