import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

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
