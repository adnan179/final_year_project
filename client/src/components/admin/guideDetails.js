import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

import AdminSidebar from "./adminSidebar";

const GuideDetails = () => {
  const { projectNumber, guideEmployeeId, adminEmail } = useParams();
  const [loading, setLoading] = useState(true);
  const [guide, setGuide] = useState(null);

  //finding the project in which the student details are avaiable
  useEffect(() => {
    //func to fetch that particular project
    axios
      .get(`http://localhost:4000/guide/${guideEmployeeId}`)
      .then((response) => {
        setGuide(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error in fetching the project details: ", err);
        setLoading(false);
      });
  }, [projectNumber, guideEmployeeId]);

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

  if (!guide) {
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
            Guide details Not Found!!
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
      <div className="flex flex-col w-[80%] h-screen py-5 px-5 mt-[100px] ml-[70px] text-white gap-6">
        <div className="flex flex-row">
          <Link
            to={`/${adminEmail}/admin-dashboard/projects/${projectNumber}`}
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
          <h1 className="flex font-bold font-poppins text-4xl">
            Guide Details
          </h1>
        </div>
        <div className="flex flex-col gap-10 pl-16">
          <div className="w-[7rem] h-[7rem] bg-black flex rounded-full"></div>
          <h1 className="font-bold font-poppins text-3xl">
            Name: {guide.name}
          </h1>
          <h2 className="font-medium font-poppins text-xl">
            Employee ID: {guide.employeeId}
          </h2>
          <h2 className="font-medium font-poppins text-xl">
            Email: {guide.email}
          </h2>
          <h2 className="font-medium font-poppins text-xl">
            Designation: {guide.designation}
          </h2>
          <h2 className="font-medium font-poppins text-xl">
            Phone Number: {guide.phoneNumber}
          </h2>
          <h2 className="font-medium font-poppins text-xl">
            Office Room Number: {guide.officeRoomNumber}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default GuideDetails;
