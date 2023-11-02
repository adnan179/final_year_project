import React, { useState } from "react";
import Sidebar from "./adminSidebar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ReviewerForm = () => {
  const { adminEmail } = useParams();
  const [reviewer, setReviewer] = useState({
    name: "",
    email: "",
    employeeId: "",
    designation: "",
    officeRoomNumber: "",
    phoneNumber: "",
    projectsHandling: "",
  });
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleReviewerChange = (e) => {
    const { id, value } = e.target;
    setReviewer({ ...reviewer, [id]: value });
  };

  const handleError = (error) => {
    // Handle errors
    if (error.response) {
      // The request was made, but the server responded with an error status code
      console.error("Request failed with status code:", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      // The request was made, but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Request setup error:", error.message);
    }
    console.error("Error posting reviewer data: ", error);

    // Handle the error state in your component, e.g., show an error message
    setErrorMessage("An error occurred while saving the project data");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Data from the form formatted for the backend
    const formattedData = {
      name: reviewer.name,
      email: reviewer.email,
      employeeId: reviewer.employeeId,
      phoneNumber: reviewer.phoneNumber,
      designation: reviewer.designation,
      cabinNumber: reviewer.officeRoomNumber,
      projectsHandling: reviewer.projectsHandling,
      password: generateStrongPassword(8),
    };

    function generateStrongPassword(length) {
      const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";

      if (length < 1) {
        return "Password length must be at least 1 character.";
      }

      let password = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }

      return password;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/reviewers/register",
        formattedData
      );

      if (response.status === 201) {
        console.log("successfully added the reviewer to the database");
        setIsSuccessful(true);
      } else {
        handleError(new Error("Failed to save reviewer to the database"));
        console.error("Failed to submit the reviewer data");
      }
    } catch (error) {
      handleError(error);
      console.error("Failed to submit the reviewer data to the database");
    }
  };

  return (
    <div className="flex flex-row w-full h-screen bg-gradient-to-r from-[#111111] to-[#2C3E50]">
      <div className="flex w-[20%] h-screen">
        <Sidebar />
      </div>

      <div className="flex flex-col w-[80%] p-10 overflow-hidden">
        <div className="flex flex-row pb-10">
          <Link
            to={`/${adminEmail}/admin-dashboard/reviewers`}
            className="flex cursor-pointer"
          >
            <svg
              height="50px"
              width="100px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              style={{
                fill: "white", // Set the fill color to white
                filter: "drop-shadow(0px 0px 10px cyan)", // Add a blue shadow effect
              }}
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M193.612,406.274c6.252-6.251,9.694-14.574,9.694-23.435c0-8.86-3.442-17.183-9.694-23.434 l-70.263-70.263h345.311c18.274-0.001,33.14-14.867,33.14-33.142s-14.866-33.141-33.14-33.141H123.349l70.263-70.263 c12.921-12.921,12.921-33.946,0.001-46.868c-6.259-6.259-14.582-9.707-23.435-9.707c-8.852,0-17.174,3.447-23.433,9.707 L19.907,232.566c-6.26,6.258-9.708,14.581-9.708,23.434s3.447,17.175,9.708,23.435l126.837,126.838 c6.259,6.259,14.582,9.707,23.434,9.707C179.032,415.98,187.353,412.532,193.612,406.274z"></path>
                <g>
                  <path d="M170.178,426.179c-11.576,0-22.46-4.508-30.646-12.693L12.695,286.647C4.509,278.465,0,267.58,0,256 c0-11.58,4.509-22.464,12.697-30.649L139.533,98.515c8.186-8.186,19.069-12.694,30.646-12.694c11.576,0,22.46,4.508,30.647,12.694 c16.897,16.9,16.896,44.396,0,61.293l-52.851,52.851h320.687C492.558,212.66,512,232.102,512,256s-19.443,43.34-43.339,43.34 H147.973l52.851,52.851c8.178,8.177,12.682,19.06,12.682,30.647c0,11.586-4.504,22.47-12.683,30.647h0.001c-0.001,0-0.001,0-0.001,0 C192.639,421.671,181.755,426.179,170.178,426.179z M170.178,106.22c-6.128,0-11.887,2.387-16.221,6.72 L27.12,239.778c-4.335,4.333-6.721,10.093-6.721,16.222c0,6.129,2.387,11.889,6.719,16.221L153.956,399.06 c4.333,4.333,10.094,6.719,16.222,6.719c6.129,0,11.889-2.387,16.222-6.719h0.001c4.324-4.324,6.706-10.086,6.706-16.222 s-2.382-11.897-6.706-16.222l-70.264-70.263c-2.916-2.917-3.789-7.304-2.21-11.115c1.578-3.81,5.296-6.296,9.422-6.296h345.31 c12.651,0.001,22.943-10.291,22.943-22.942c0-12.651-10.292-22.942-22.941-22.942H123.349c-4.126,0-7.844-2.486-9.422-6.296 c-1.579-3.811-0.706-8.198,2.21-11.115l70.263-70.263c8.945-8.945,8.945-23.499,0-32.446 C182.068,108.606,176.305,106.22,170.178,106.22z"></path>
                  <path d="M117.264,344.247c-2.611,0-5.22-0.996-7.212-2.987l-2.023-2.022c-3.983-3.983-3.983-10.441,0-14.425 c3.984-3.982,10.44-3.982,14.425,0l2.023,2.022c3.983,3.983,3.983,10.441,0,14.425C122.484,343.25,119.874,344.247,117.264,344.247 z"></path>
                  <path d="M95.494,322.476c-2.611,0-5.22-0.996-7.212-2.987l-53.276-53.275 c-3.983-3.983-3.983-10.441,0-14.425c3.984-3.982,10.44-3.982,14.425,0l53.276,53.275c3.983,3.983,3.983,10.441,0,14.425 C100.714,321.481,98.104,322.476,95.494,322.476z"></path>
                </g>
              </g>
            </svg>
          </Link>
          <h1 className="text-white font-poppins font-bold text-3xl">
            Reviewer Form
          </h1>
        </div>

        {isSuccessful ? (
          <div className="flex flex-col w-full justify-center items-center p-10 overflow-hidden">
            <h1 className="text-2xl font-poppins font-bold text-white">
              Reviewer added successfully!!
            </h1>
            <div
              onClick={() => setIsSuccessful(false)} // Corrected the onClick function
              className="text-xl text-blue-700 font-medium font-poppins cursor-pointer"
            >
              Add another reviewer
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full h-screen bg-black bg-opacity-25 rounded-2xl px-8 py-5 overflow-y-auto"
          >
            <div className="">
              <h1 className="text-3xl text-white font-sanista">
                Reviewer Details
              </h1>
              <div className="inline-block w-full h-[1.5px] mt-2 bg-white px-4"></div>
              <div className="grid grid-cols-3 gap-3 mt-3">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="name"
                    className="text-white font-sanista text-2xl font-medium"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Enter the name"
                    className="flex px-4 py-2 rounded outline-none shadow-2xl focus:ring-blue-700 focus:ring-2"
                    value={reviewer.name}
                    onChange={handleReviewerChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="email"
                    className="text-white font-sanista text-2xl font-medium"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="Enter the email"
                    className="flex px-4 py-2 rounded outline-none shadow-2xl focus:ring-blue-700 focus:ring-2"
                    value={reviewer.email}
                    onChange={handleReviewerChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="employeeId"
                    className="text-white font-sanista text-2xl font-medium"
                  >
                    Employee ID
                  </label>
                  <input
                    id="employeeId"
                    type="text"
                    required
                    placeholder="Enter the employee ID"
                    className="flex px-4 py-2 rounded outline-none shadow-2xl focus:ring-blue-700 focus:ring-2"
                    value={reviewer.employeeId}
                    onChange={handleReviewerChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="designation"
                    className="text-white font-sanista text-2xl font-medium"
                  >
                    Designation
                  </label>
                  <input
                    id="designation"
                    type="text"
                    required
                    placeholder="Enter the designation"
                    className="flex px-4 py-2 rounded outline-none shadow-2xl focus:ring-blue-700 focus:ring-2"
                    value={reviewer.designation}
                    onChange={handleReviewerChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="officeRoomNumber"
                    className="text-white font-sanista text-2xl font-medium"
                  >
                    Office Room Number
                  </label>
                  <input
                    id="officeRoomNumber"
                    type="text"
                    required
                    placeholder="Enter the office room number"
                    className="flex px-4 py-2 rounded outline-none shadow-2xl focus:ring-blue-700 focus:ring-2"
                    value={reviewer.officeRoomNumber}
                    onChange={handleReviewerChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="phoneNumber"
                    className="text-white font-sanista text-2xl font-medium"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="text"
                    required
                    placeholder="Enter the phone number"
                    className="flex px-4 py-2 rounded outline-none shadow-2xl focus:ring-blue-700 focus:ring-2"
                    value={reviewer.phoneNumber}
                    onChange={handleReviewerChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="projectsHandling"
                    className="text-white font-sanista text-2xl font-medium"
                  >
                    Projects Handling
                  </label>
                  <input
                    id="projectsHandling"
                    type="text"
                    required
                    placeholder="Enter the projects handling"
                    className="flex px-4 py-2 rounded outline-none shadow-2xl focus:ring-blue-700 focus:ring-2"
                    value={reviewer.projectsHandling}
                    onChange={handleReviewerChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center flex-col">
              <button
                type="submit"
                className="text-white text-lg mt-5 bg-green-500 hover:bg-green-700 px-6 py-2 rounded shadow-2xl focus:outline-none font-poppins font-medium"
              >
                Submit
              </button>
            </div>
            {/* Error Message */}
            {errorMessage && (
              <div className="mt-4 text-red-600">{errorMessage}</div>
            )}
          </form>
        )}

        {errorMessage && (
          <div className="mt-4 text-red-600">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default ReviewerForm;
