import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "./adminSidebar";
import axios from "axios";

const ProjectDetailsForm = () => {
  const { adminEmail } = useParams();
  const [project, setProject] = useState({
    projectTitle: "", // Match the id to property name
    projectNumber: "", // Match the id to property name
    projectDomain: "", // Match the id to property name
    projectDescription: "",
    // Match the id to property name
  });

  const [guide, setGuide] = useState({
    guideName: "", // Match the id to property name
    employeeId: "", // Match the id to property name
    designation: "", // Match the id to property name
    guidePhoneNumber: "", // Match the id to property name
    guideEmail: "", // Match the id to property name
    cabinNumber: "", // Match the id to property name
  });

  const [students, setStudents] = useState([
    {
      studentName: "", // Match the id to property name
      studentRollNumber: "", // Match the id to property name
      studentDepartment: "", // Match the id to property name
      studentPhoneNumber: "", // Match the id to property name
      studentEmail: "", // Match the id to property name
      studentBranch: "", // Match the id to property name
    },
  ]);

  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleProjectChange = (e) => {
    const { id, value } = e.target;
    setProject({ ...project, [id]: value });
  };

  const handleGuideChange = (e) => {
    const { id, value } = e.target;
    setGuide({ ...guide, [id]: value });
  };

  const handleStudentChange = (e, index) => {
    const { id, value } = e.target;
    const updatedStudents = [...students];
    updatedStudents[index] = { ...updatedStudents[index], [id]: value };
    setStudents(updatedStudents);
  };

  const handleAddStudent = () => {
    if (students.length < 4) {
      setStudents([...students, {}]);
    }
  };

  const handleError = (error) => {
    // Handle errors
    if (error.response) {
      // The request was made, but the server responded with an error status code
      console.error("Request failed with status code:", error.response.status);
      console.error("Response data:", error.response.data);
      setErrorMessage(
        "Request failed with status code: " + error.response.status
      );
    } else if (error.request) {
      // The request was made, but no response was received
      console.error("No response received:", error.request);
      setErrorMessage("No response received from the server.");
    } else {
      // Something happened in setting up the request
      console.error("Request setup error:", error.message);
      setErrorMessage("Request setup error: " + error.message);
    }
    console.error("Error posting project data: ", error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate random passwords for students and guide
    const generatePassword = (length) => {
      const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let password = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
      return password;
    };

    const formattedData = {
      projectNumber: project.projectNumber,
      title: project.projectTitle,
      description: project.projectDescription,
      domain: project.projectDomain,
      team: students.map((student) => {
        return {
          name: student.studentName,
          rollNumber: student.studentRollNumber,
          department: student.studentDepartment,
          branch: student.studentBranch,
          phoneNumber: student.studentPhoneNumber,
          projectNumber: project.projectNumber,
          email: student.studentEmail,
          password: generatePassword(10),
        };
      }),
      guide: {
        name: guide.guideName,
        phoneNumber: guide.guidePhoneNumber,
        email: guide.guideEmail,
        employeeId: guide.employeeId,
        designation: guide.designation,
        officeRoomNumber: guide.cabinNumber,
        projectNumber: project.projectNumber,
        password: generatePassword(10),
      },
    };
    console.log(formattedData);
    try {
      const response = await axios.post(
        "http://localhost:4000/projects",
        formattedData
      );

      if (response.status === 201) {
        console.log("successfully submitted the project to the database");
        setIsSuccess(true);
      } else {
        handleError(new Error("Failed to save project data"));
        console.log("failed to submit the project to the database");
      }
    } catch (error) {
      handleError(error);
      console.log(error.message);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-row w-full h-screen bg-gradient-to-r from-[#111111] to-[#2C3E50]">
        <div className="flex w-[20%] h-screen ">
          <Sidebar />
        </div>
        <div className="flex flex-col w-[80%] justify-center items-center p-10 overflow-hidden">
          <h1 className="text-2xl font-poppins font-bold text-white">
            Project submitted successfully!!
          </h1>
          <Link
            onClick={() => setIsSuccess(false)}
            className="text-xl text-blue-700 font-medium font-poppins"
          >
            Add another project
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-row w-full h-screen bg-gradient-to-r from-[#111111] to-[#2C3E50] ">
      <div className="flex w-[20%] h-screen ">
        <Sidebar />
      </div>
      <div className="flex flex-col w-[80%] p-10 overflow-hidden">
        <div className="flex flex-row pb-10 items-center">
          <Link
            to={`/${adminEmail}/admin-dashboard/projects`}
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
            New project form
          </h1>
        </div>
        {/* form container */}
        <form className="w-full  h-screen bg-black bg-opacity-25 rounded-2xl px-8 py-5 overflow-y-auto">
          {/* project details */}
          <div className="">
            <h1 className="text-3xl text-white font-sanista">
              Project Details
            </h1>
            <div className="inline-block w-full h-[1.5px] mt-2 bg-white px-4"></div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {/* Project Title */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="projectTitle"
                  className="text-white font-sanista text-2xl font-medium"
                >
                  Title
                </label>
                <input
                  id="projectTitle"
                  type="text"
                  required
                  placeholder="Enter the project title"
                  className="flex px-4 py-2 rounded outline-none shadow-2xl focus:ring-blue-700 focus:ring-2"
                  value={project.title}
                  onChange={handleProjectChange}
                />
              </div>
              {/* Project Number */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="projectNumber"
                  className="text-white font-sanista text-2xl font-medium"
                >
                  Number
                </label>
                <input
                  id="projectNumber"
                  type="text"
                  required
                  placeholder="Enter the project number"
                  className="flex px-4 py-2 rounded outline-none shadow-2xl focus:ring-blue-700 focus:ring-2"
                  value={project.number}
                  onChange={handleProjectChange}
                />
              </div>
              {/* Project Domain */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="projectDomain"
                  className="text-white font-sanista text-2xl font-medium"
                >
                  Domain
                </label>
                <input
                  type="text"
                  id="projectDomain"
                  required
                  placeholder="Enter the project domain"
                  className="flex px-4 py-2 rounded outline-none shadow-2xl focus:ring-blue-700 focus:ring-2"
                  value={project.projectDomain}
                  onChange={handleProjectChange}
                />
              </div>
            </div>
            {/* Project Description */}
            <div className="flex flex-col w-full mt-3 gap-3">
              <label
                htmlFor="projectDescription"
                className="text-white font-sanista text-2xl font-medium"
              >
                Description
              </label>
              <input
                type="text"
                id="projectDescription"
                required
                placeholder="Enter the project description"
                className="flex w-full h-[100px] pl-3 rounded-md outline-none shadow-2xl focus:ring-blue-700 focus:ring-2"
                value={project.description}
                onChange={handleProjectChange}
              />
            </div>
          </div>
          {/* guide details */}
          <div className="mt-7">
            <h1 className="text-3xl text-white font-sanista">Guide Details</h1>
            <div className="inline-block w-full h-[1.5px] mt-2 bg-white px-4"></div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {/* Guide Name */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="guideName"
                  className="text-white font-sanista text-2xl font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="guideName"
                  required
                  placeholder="Enter the guide name"
                  className="flex px-4 py-2 rounded outline-none shadow-2xl focus:ring-blue-700 focus:ring-2"
                  value={guide.name}
                  onChange={handleGuideChange}
                />
              </div>
              {/* Guide Employee ID */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="employeeId"
                  className="text-white font-sanista text-2xl font-medium"
                >
                  Employee ID
                </label>
                <input
                  type="text"
                  id="employeeId"
                  required
                  placeholder="Enter the guide's employee ID"
                  className="flex px-4 py-2 rounded outline-none shadow-2xl focus:ring-blue-700 focus:ring-2"
                  value={guide.employeeId}
                  onChange={handleGuideChange}
                />
              </div>
              {/* Guide Designation */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="designation"
                  className="text-white font-sanista text-2xl font-medium"
                >
                  Designation
                </label>
                <input
                  type="text"
                  id="designation"
                  required
                  placeholder="Enter the guide's designation"
                  className="flex px-4 py-2 rounded outline-none shadow-2xl focus:ring-blue-700 focus:ring-2"
                  value={guide.designation}
                  onChange={handleGuideChange}
                />
              </div>
              {/* Guide Phone Number */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="guidePhoneNumber"
                  className="text-white font-sanista text-2xl font-medium"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="guidePhoneNumber"
                  required
                  placeholder="Enter the guide's phone number"
                  className="flex px-4 py-2 rounded outline-none shadow-2xl focus:ring-blue-700 focus:ring-2"
                  value={guide.phoneNumber}
                  onChange={handleGuideChange}
                />
              </div>
              {/* Guide Email */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="guideEmail"
                  className="text-white font-sanista text-2xl font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="guideEmail"
                  required
                  placeholder="Enter the guide's email"
                  className="flex px-4 py-2 rounded outline-none shadow-2xl focus:ring-blue-700 focus:ring-2"
                  value={guide.email}
                  onChange={handleGuideChange}
                />
              </div>
              {/* Guide Cabin Number */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="cabinNumber"
                  className="text-white font-sanista text-2xl font-medium"
                >
                  Cabin Number
                </label>
                <input
                  type="text"
                  id="cabinNumber"
                  required
                  placeholder="Enter the guide's cabin number"
                  className="flex px-4 py-2 rounded outline-none shadow-2xl focus:ring-blue-700 focus:ring-2"
                  value={guide.cabinNumber}
                  onChange={handleGuideChange}
                />
              </div>
            </div>
          </div>
          {/* students */}
          <div className="mt-7">
            <h1 className="text-3xl text-white font-sanista">
              Student Details
            </h1>
            <div className="inline-block w-full h-[1.5px] mt-2 bg-white px-4"></div>
            {/* Student Details */}
            {students.map((student, index) => (
              <div key={index} className="grid grid-cols-3 gap-3 mt-3">
                {/* Student Name */}
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="studentName"
                    className="text-white font-sanista text-2xl font-medium"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="studentName"
                    required
                    placeholder="Enter student's name"
                    className="flex px-4 py-2 rounded outline-none shadow-2xl focus:ring-blue-700 focus:ring-2"
                    value={student.name}
                    onChange={(e) => handleStudentChange(e, index)}
                  />
                </div>
                {/* Student Roll Number */}
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="studentRollNumber"
                    className="text-white font-sanista text-2xl font-medium"
                  >
                    Roll Number
                  </label>
                  <input
                    type="text"
                    id="studentRollNumber"
                    required
                    placeholder="Enter student's roll number"
                    className="flex px-4 py-2 rounded outline-none shadow-2xl focus:ring-blue-700 focus:ring-2"
                    value={student.rollNumber}
                    onChange={(e) => handleStudentChange(e, index)}
                  />
                </div>
                {/* Student Department */}
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="studentDepartment"
                    className="text-white font-sanista text-2xl font-medium"
                  >
                    Department
                  </label>
                  <input
                    type="text"
                    id="studentDepartment"
                    required
                    placeholder="Enter student's department"
                    className="flex px-4 py-2 rounded outline-none shadow-2xl focus:ring-blue-700 focus:ring-2"
                    value={student.department}
                    onChange={(e) => handleStudentChange(e, index)}
                  />
                </div>
                {/* Student Phone Number */}
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="studentPhoneNumber"
                    className="text-white font-sanista text-2xl font-medium"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="studentPhoneNumber"
                    required
                    placeholder="Enter student's phone number"
                    className="flex px-4 py-2 rounded outline-none shadow-2xl focus:ring-blue-700 focus:ring-2"
                    value={student.phoneNumber}
                    onChange={(e) => handleStudentChange(e, index)}
                  />
                </div>
                {/* Student Email */}
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="studentEmail"
                    className="text-white font-sanista text-2xl font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="studentEmail"
                    required
                    placeholder="Enter student's email"
                    className="flex px-4 py-2 rounded outline-none shadow-2xl focus:ring-blue-700 focus:ring-2"
                    value={student.email}
                    onChange={(e) => handleStudentChange(e, index)}
                  />
                </div>
                {/* Student Branch */}
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="studentBranch"
                    className="text-white font-sanista text-2xl font-medium"
                  >
                    Branch
                  </label>
                  <input
                    type="text"
                    id="studentBranch"
                    required
                    placeholder="Enter student's branch"
                    className="flex px-4 py-2 rounded outline-none shadow-2xl focus:ring-blue-700 focus:ring-2"
                    value={student.branch}
                    onChange={(e) => handleStudentChange(e, index)}
                  />
                </div>
              </div>
            ))}
            {/* Add Student Button */}
            {students.length < 4 && (
              <button
                type="button"
                className="mt-3 px-4 py-2 bg-blue-700 rounded text-white"
                onClick={handleAddStudent}
              >
                Add Student
              </button>
            )}
          </div>
          {/* Error Message */}
          {errorMessage && (
            <div className="mt-4 text-red-600">{errorMessage}</div>
          )}
          {/* Submit Button */}
          <button
            className="mt-7 w-[150px] h-[50px] bg-blue-700 rounded text-white font-bold text-2xl"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectDetailsForm;
