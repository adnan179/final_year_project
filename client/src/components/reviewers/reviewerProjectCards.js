import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import folder from "../../assets/blue_folder.png";
import axios from "axios";

const ReviewerProjectCards = () => {
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
      } else {
        console.log("failed to fetch the project data");
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
        <div></div>
        <div className="flex flex-col gap-2">
          <div>
            <select
              className="px-2 py-1 bg-[#E5DFDF]  text-md rounded shadow-lg font-sanista"
              onChange={(e) => setSearchCategory(e.target.value)}
              value={searchCategory}
            >
              <option value="by-number">By Project Number</option>
              <option value="by-domain">By Domain</option>
              <option value="by-guide">By Guide</option>
            </select>
          </div>
          <div className="flex flex-row">
            <div className="w-[400px] relative">
              <input
                type="text"
                placeholder="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="absolute w-full font-sanista text-md text-black flex px-4 py-2 rounded-lg bg-[#E5DFDF] 
                shadow focus:ring-[#981F2A] focus:ring-2 outline-none"
              />
            </div>
            <button
              onClick={searchProjects}
              className="px-6 py-2 font-sanista font-semibold bg-[#E5DFDF]  rounded shadow-lg text-md"
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
              <div className="w-[400px] h-[4rem] flex flex-row justify-between items-center px-5 border bg-[#E5DFDF]  shadow-xl rounded-lg">
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

export default ReviewerProjectCards;
