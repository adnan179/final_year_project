import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "./adminSidebar";
import folder from "../../assets/blue_folder.png";

const ProjectDetails = () => {
  const Navigate = useNavigate();
  const { projectNumber, adminEmail } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guide, setGuide] = useState(null);
  const [students, setStudents] = useState([]);

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

        console.log(project);
        console.log(guide);
        console.log(students);
      })
      .catch((err) => {
        console.log("Error in fetching the project details: ", err);
        setLoading(false);
      });
  }, [projectNumber]);

  const handleDelete = async () => {
    try {
      axios
        .delete(`http://localhost/projects/${projectNumber}`)
        .then((response) => {
          console.log("Project deleted successfully.");
          Navigate("projects");
        });
    } catch (error) {
      console.log("Error deleting project: ", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-row w-full h-screen bg-gradient-to-r from-[#111111] to-[#2C3E50]">
        <div className="flex w-[20%] h-screen">
          <AdminSidebar />
        </div>
        <div className="flex flex-col w-[80%] h-screen py-5 px-5 justify-center items-center">
          <h1 className="text-[40px] text-blue-500 font-poppins font-bold">
            Loading....
          </h1>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-row w-full h-screen bg-gradient-to-r from-[#111111] to-[#2C3E50]">
        <div className="flex w-[20%] h-screen">
          <AdminSidebar />
        </div>
        <div className="flex flex-col w-[80%] h-screen py-5 px-5 justify-center items-center">
          <h1 className="text-[40px] text-blue-500 font-poppins font-bold">
            404 Error
          </h1>
          <h1 className="text-[30px] text-white font-poppins font-medium">
            Project Not Found!!
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row w-full h-screen bg-gradient-to-r from-[#111111] to-[#2C3E50]">
      <div className="flex w-[20%] h-screen">
        <AdminSidebar />
      </div>
      <div className="flex flex-col w-[80%] h-screen py-5 px-5">
        {/* heading */}
        <div className="flex flex-row  pt-10 pl-5 items-center">
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
          <h1 className="text-[40px] text-white font-poppins font-bold">
            {project.projectNumber}
          </h1>
          <button
            onClick={() => handleDelete()}
            className="px-4 py-2 rounded-lg text-red-700 bg-white font-bold ml-10 cursor-pointer"
          >
            Delete
          </button>
        </div>
        {/* project,guide,chat, documents */}
        <div className="flex flex-col mt-[50px] px-[50px] gap-5">
          {/* project details */}

          <div className="flex flex-row gap-10 cursor-pointer">
            <div className="flex flex-col text-white text-2xl font-medium font-poppins gap-4 w-[300px]">
              <h2>{project.title}</h2>
              <h2>{project.domain}</h2>
              <p className="text-sm">Description:{project.description}</p>
            </div>
            <Link
              to={`/${adminEmail}/admin-dashboard/projects/${projectNumber}/guide/${guide.employeeId}`}
            >
              <div className="flex flex-col justify-center items-center gap-5 w-[200px] h-[250px] bg-white rounded-md shadow-xl">
                {/* guide details */}
                <div className="font-bold text-2xl text-black font-poppins">
                  Guide
                </div>
                <div className="w-[5rem] h-[5rem] rounded-full flex bg-black"></div>
                <h2 className="font-medium text-xl font-poppins">
                  {guide.name}
                </h2>
                <p className="font-medium font-poppins">
                  {project.guide.employeeId}
                </p>
              </div>
            </Link>
            <div className="flex flex-col items-center">
              <img
                src={folder}
                alt="documents"
                className="w-[250px] h-[250px]"
              />
              <h1 className="flex font-poppins font-medium text-lg text-white mt-[-40px]">
                Documents
              </h1>
            </div>
            <div className="flex flex-col items-center">
              <img src={folder} alt="chats" className="w-[250px] h-[250px]" />
              <h1 className="flex font-poppins font-medium text-lg text-white mt-[-40px]">
                Chats
              </h1>
            </div>
          </div>
        </div>

        {/* Students details */}
        <div className="flex flex-col mt-[50px] px-[50px] gap-5">
          {/* team details */}
          <div className="font-bold text-2xl text-white font-poppins">Team</div>
          <div className="flex flex-row gap-16">
            {students &&
              students.map((student) => (
                <Link
                  to={`/${adminEmail}/admin-dashboard/projects/${projectNumber}/student/${student.rollNumber}`}
                >
                  <div className="flex flex-col justify-center items-center gap-5 w-[200px] h-[250px] bg-white rounded-md shadow-xl">
                    <div className="w-[5rem] h-[5rem] rounded-full flex bg-black"></div>
                    <h2 className="font-medium text-xl font-poppins">
                      {student.name}
                    </h2>
                    <p className="font-medium font-poppins">
                      {student.rollNumber}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
