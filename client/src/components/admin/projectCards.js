import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import folder from "../../assets/blue_folder.png";
import axios from "axios";
import { handlePopup } from "../../lib/popUps";

const ProjectCards = () => {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([]);
  const [searchCategory, setSearchCategory] = useState("by-number");

  //component to ftech projects from the database
  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:4000/projects");
      if (response.status === 200) {
        console.log(response.data);

        setProjects(response.data);
        handlePopup("successfully fetched projects", "success");
      } else {
        console.log("failed to fetch the project data");
        handlePopup("failed to fetch the project data", "error");
      }
    } catch (error) {
      console.log("Error fetching the project data: ", error);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  const searchProjects = async () => {
    try {
      let endpoint = "projects";
      if (searchCategory === "by-number") {
        const projectNumber = search.trim();
        endpoint = `projects/by-number/${projectNumber}`;
      } else if (searchCategory === "by-domain") {
        const projectDomain = search.trim();
        endpoint = `projects/by-domain/${projectDomain}`;
      } else if (searchCategory === "by-guide") {
        const guide = search.trim();
        endpoint = `projects/by-guide/${guide}`;
      }

      const response = await axios.get(`http://localhost:4000/${endpoint}`);
      if (response.status === 200) {
        const responseData = response.data;

        // Ensure responseData is an array
        const projectsArray = Array.isArray(responseData)
          ? responseData
          : [responseData];

        setProjects(projectsArray);
      } else {
        console.log("failed to fetch the project data");
      }
    } catch (error) {
      console.log("error fetching the project data: ", error);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen p-5">
      <div className="flex flex-row justify-between px-7 py-5">
        <div className="flex flex-row gap-3">
          <Link to="form">
            <button className="flex font-sanista font-semibold px-6 py-3 bg-[#981F2A] text-white rounded shadow-lg text-lg">
              New Project
            </button>
          </Link>
          <Link to="reviewDates">
            <button className="flex font-sanista font-semibold px-6 py-3 bg-[#981F2A] text-white rounded shadow-lg text-lg">
              Update Review dates
            </button>
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-gray-600">Search using project numbers</p>
          </div>
          <div className="flex flex-row">
            <div className="w-[400px] relative">
              <input
                type="text"
                placeholder="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="absolute w-full font-sanista text-sm flex px-4 py-2 rounded-lg bg-[#E5DFDF] 
                 focus:ring-[#981F2A] focus:ring-2 outline-none shadow"
              />
            </div>
            <button
              onClick={searchProjects}
              className="px-6 py-2 font-sanista font-semibold bg-[#E5DFDF] rounded shadow text-sm"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="mt-[100px] grid grid-cols-3 gap-x-0 gap-y-6 px-10">
        {projects &&
          projects.map((project) => (
            <Link to={`${project.projectNumber}`} key={project.projectNumber}>
              <div className="w-[350px] h-[4rem] flex flex-row justify-between items-center px-5 border bg-[#E5DFDF]  shadow-xl rounded-lg">
                <h2 className="text-[25px] font-semibold font-poppins">
                  {project.projectNumber}
                </h2>
                <img src={folder} alt="icon" className="w-[5rem] h-[5rem]" />
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ProjectCards;
