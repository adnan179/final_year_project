import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { handlePopup } from "../../lib/popUps";
import { BlackLeftArrow } from "../../lib/leftArrow";
import AdminSidebar from "./adminSidebar";

const ProjectDetailsForm = () => {
  const { adminEmail } = useParams();
  const navigate = useNavigate();
  const [projectNumbers, setProjectNumbers] = useState([]);
  const [project, setProject] = useState({
    projectTitle: "",
    projectNumber: "",
    projectDomain: "",
    projectDescription: "",
    guide: "",
    student1: "",
    student2: "",
    student3: "",
    student4: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [guides, setGuides] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    //function to fetch all available guides and students for the project
    const fetchData = async () => {
      try {
        const guideData = await axios.get(
          "http://localhost:4000/guide/getGuides"
        );
        const studentData = await axios.get(
          "http://localhost:4000/student/getAllStudents"
        );
        const projectNumbersData = await axios.get(
          "http://localhost:4000/projects/projectNumbers"
        );

        setGuides(guideData.data.guides);
        setStudents(studentData.data.students);
        setProjectNumbers(projectNumbersData.data.projectNumbers);
      } catch (error) {
        console.log(
          "Error fetching project numbers, guides and students",
          error
        );
        handlePopup(
          "Error fetching project numbers, guides and students",
          "error"
        );
      }
    };
    fetchData();
  }, []);

  //function to handle input changes for project details
  const handleProjectChange = (e) => {
    setProject({ ...project, [e.target.id]: e.target.value });
  };

  const handleProjectExists = (e) => {
    if (e.target.value.includes(projectNumbers)) {
      handlePopup("Project number already exists", "error");
    }
  };

  //function to add guide
  const handleAddGuide = (e) => {
    //checking if guide is already associated with this project or not
    const selectedGuide = guides.find((guide) => guide._id === e.target.value);
    setProject({ ...project, guide: selectedGuide });
    if (
      project.guide &&
      project.guide.projects.includes(project.projectNumber)
    ) {
      setProject({ ...project, guide: null });
      handlePopup("Already associated with this project", "error");
    }
  };

  const handleAddStudent = () => {
    // Check if the maximum number of students is reached
    if (selectedStudents.length >= 4) {
      handlePopup("Maximum number of students reached (4)", "error");
      return;
    }
    setSelectedStudents([...selectedStudents, "select student"]);
  };

  const handleStudentChange = (value, index) => {
    // Check if the student is already added
    if (selectedStudents.includes(value)) {
      handlePopup("Student is already part of this project", "error");
      return;
    }
    const updatedStudents = [...selectedStudents];
    updatedStudents[index] = value;
    setSelectedStudents(updatedStudents);
  };

  const handleDeleteStudent = (index) => {
    const updatedStudents = [...selectedStudents];
    updatedStudents.splice(index, 1);
    setSelectedStudents(updatedStudents);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedStudents.length < 3) {
      handlePopup("At least three students should be selected", "error");
      return;
    }
    setIsLoading(true);
    try {
      const formData = {
        projectNumber: project.projectNumber,
        title: project.projectTitle,
        description: project.projectDescription,
        domain: project.projectDomain,
        guide: guides[0]?._id,
        student1: selectedStudents[0],
        student2: selectedStudents[1],
        student3: selectedStudents[2],
        student4: selectedStudents[3] || "",
      };

      const response = await axios.post(
        "http://localhost:4000/projects",
        formData
      );

      if (response.status === 201) {
        handlePopup("Project created successfully", "success");
        // Fetch updated data
        const guideData = await axios.get(
          "http://localhost:4000/guide/getGuides"
        );
        const studentData = await axios.get(
          "http://localhost:4000/student/getAllStudents"
        );
        const projectNumbersData = await axios.get(
          "http://localhost:4000/projects/projectNumbers"
        );

        setGuides(guideData.data.guides);
        setStudents(studentData.data.students);
        setProjectNumbers(projectNumbersData.data.projectNumbers);

        // Reset form values
        setProject({
          projectTitle: "",
          projectNumber: "",
          projectDomain: "",
          projectDescription: "",
          guide: "",
          student1: "",
          student2: "",
          student3: "",
          student4: "",
        });
        setSelectedStudents([]);
        navigate(`/${adminEmail}/admin-dashboard/projects`);
      } else {
        handlePopup("An error occurred while saving the project data", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      handlePopup("An error occurred while saving the project data", "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    // Display loading spinner while waiting for the form submission
    return (
      <div className="flex flex-row w-full h-screen">
        <div className="flex w-[20%] h-screen">
          <AdminSidebar />
        </div>
        <div className="flex w-[80%] h-screen justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#981F2A]"></div>
        </div>
      </div>
    );
  }

  //the actual form before successful submission
  return (
    <div className="flex flex-row w-full h-screen ">
      <div className="flex w-[20%] h-screen ">
        <AdminSidebar />
      </div>
      <div className="flex flex-col w-[80%] p-10 overflow-hidden">
        <div className="flex flex-row pb-10 items-center">
          <Link
            to={`/${adminEmail}/admin-dashboard/projects`}
            className="flex cursor-pointer"
          >
            <BlackLeftArrow />
          </Link>
          <h1 className="text-black font-poppins font-bold text-xl">
            New project form
          </h1>
        </div>
        {/* form container */}
        <form className="w-full  h-screen bg-black/90 rounded-lg px-8 py-5 overflow-y-auto">
          {/* project details */}
          <div className="">
            <h1 className="text-xl text-white font-sanista">Project Details</h1>
            <div className="inline-block w-full h-[1.5px] mt-2 bg-white px-4"></div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {/* Project Title */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="projectTitle"
                  className="text-white font-sanista text-lg font-medium"
                >
                  Title
                </label>
                <input
                  id="projectTitle"
                  type="text"
                  required
                  placeholder="Enter the project title"
                  className="flex px-4 py-2 rounded outline-none shadow focus:ring-[#981F2A] focus:ring-3"
                  value={project.title}
                  onChange={handleProjectChange}
                />
              </div>
              {/* Project Number */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="projectNumber"
                  className="text-white font-sanista text-lg font-medium"
                >
                  Number
                </label>
                <input
                  id="projectNumber"
                  type="text"
                  required
                  placeholder="Enter the project number"
                  className="flex px-4 py-2 rounded outline-none shadow focus:ring-[#981F2A] focus:ring-3"
                  value={project.number}
                  onChange={(e) => {
                    handleProjectChange(e);
                    handleProjectExists(e);
                  }}
                />
              </div>
              {/* Project Domain */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="projectDomain"
                  className="text-white font-sanista text-lg font-medium"
                >
                  Domain
                </label>
                <input
                  type="text"
                  id="projectDomain"
                  required
                  placeholder="Enter the project domain"
                  className="flex px-4 py-2 rounded outline-none shadow focus:ring-[#981F2A] focus:ring-3"
                  value={project.projectDomain}
                  onChange={handleProjectChange}
                />
              </div>
            </div>
            {/* Project Description */}
            <div className="flex flex-col w-full mt-3 gap-3">
              <label
                htmlFor="projectDescription"
                className="text-white font-sanista text-lg font-medium"
              >
                Description
              </label>
              <input
                type="text"
                id="projectDescription"
                required
                placeholder="Enter the project description"
                className="flex w-full h-[100px] pl-3 rounded-md outline-none shadow focus:ring-[#981F2A] focus:ring-3"
                value={project.description}
                onChange={handleProjectChange}
              />
            </div>
          </div>
          {/* guide details */}
          <div className="mt-7">
            <h1 className="text-xl text-white font-sanista">Select guide</h1>
            <div className="inline-block w-full h-[1.5px] mt-2 bg-white px-4"></div>
            <div className="flex flex-row mt-2 gap-2">
              <select
                value="Select guide"
                className="bg-[#E5DFDF] w-[40%] px-2 py-1 rounded"
                onChange={(e) => {
                  handleAddGuide(e);
                }}
              >
                <option value="">Select Guide</option>
                {guides.length > 0 &&
                  guides.map((guide) => (
                    <option value={guide._id} key={guide._id}>
                      {guide.name}-{guide.employeeId}
                    </option>
                  ))}
              </select>
            </div>
            {/* Display guide details or error message */}
            {project.guide && (
              <div className="mt-3 flex">
                {project.guide.projects.includes(project.projectNumber) ? (
                  <p className="text-red-600">
                    {project.guide.name} is already associated with this
                    project.
                  </p>
                ) : (
                  <div className="px-4 py-1 bg-[#E5DFDF] flex flex-row gap-3 rounded items-center">
                    <p className="text-black font-sanista">
                      {project.guide.name} - {project.guide.employeeId}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* students */}
          <div className="mt-7">
            <h1 className="text-xl text-white font-sanista">Student Details</h1>
            <div className="inline-block w-full h-[1.5px] mt-2 bg-white px-4"></div>
            {/* Student Details */}
            {selectedStudents.length <= 4 && (
              <div className="mt-2">
                {selectedStudents.map((selectedStudent, index) => (
                  <div className="flex flex-row mt-2 gap-3">
                    <select
                      required
                      value={selectedStudent}
                      className="bg-[#E5DFDF]  px-2 py-1 rounded"
                      onChange={(e) =>
                        handleStudentChange(e.target.value, index)
                      }
                    >
                      <option value="">Select Student</option>
                      {students.map((student) => (
                        <option key={student._id} value={student._id}>
                          {student.name}-{student.rollNumber}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}
            {/* Add Student Button */}
            {selectedStudents.length < 4 && (
              <button
                type="button"
                className="mt-3 px-4 py-2 bg-[#981F2A] rounded text-white"
                onClick={handleAddStudent}
              >
                Add Student
              </button>
            )}
            {/* Display selected students */}
            <div className="mt-3 flex flex-col  gap-2">
              {selectedStudents.map((student, index) => (
                <div
                  key={index}
                  className="px-4 py-1 bg-[#E5DFDF] flex gap-3 rounded items-center"
                >
                  <p className="text-black font-sanista">{student}</p>
                  <button
                    onClick={handleDeleteStudent}
                    className="rounded px-2 py-1 bg-red-500 text-white"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Submit Button */}
          <button
            className="mt-7 px-4 py-2 bg-[#981F2A] rounded text-white font-bold text-lg"
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
