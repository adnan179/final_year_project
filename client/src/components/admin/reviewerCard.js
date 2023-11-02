import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ReviewerCard = () => {
  const { adminEmail } = useParams();
  const [search, setSearch] = useState("");
  const [reviewers, setReviewers] = useState([]);
  const [filteredReviewers, setFilteredReviewers] = useState([]);

  useEffect(() => {
    // Fetch reviewer data from your API
    axios
      .get("http://localhost:4000/reviewers")
      .then((response) => {
        setReviewers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviewer data: ", error);
      });
  }, []); // The empty dependency array ensures this effect runs only once
  useEffect(() => {
    const filtered = reviewers.filter((reviewer) =>
      reviewer.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredReviewers(filtered);
  }, [search, reviewers]);
  return (
    <div className="flex flex-col w-full h-screen p-5 bg-inherit">
      <div className="flex flex-row justify-between w-full px-8 pt-10">
        <Link to={"form"}>
          <button className="flex font-sanista font-semibold px-8 py-4 bg-white rounded shadow-2xl text-2xl">
            Add new reviewer
          </button>
        </Link>
        <div className="w-[400px] relative shadow-2xl shadow-blue-400 rounded-md">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="absolute w-full font-sanista text-xl flex px-4 py-2 rounded-lg bg-gradient-to-r from-transparent via-gray-600 to-transparent shadow-inner focus:ring-blue-500 focus:ring-2 outline-none"
          />
        </div>
      </div>
      <div className="flex pt-14 px-14 gap-10">
        {filteredReviewers.map((reviewer) => (
          <Link
            to={`/${adminEmail}/admin-dashboard/reviewers/${reviewer.employeeId}`}
            key={reviewer._id} // Assuming "_id" is the unique identifier in your data
            className="flex flex-col justify-between items-center px-2 py-10 bg-white rounded-lg w-[250px] h-[300px] 
            shadow-xl cursor-pointer"
          >
            <div className="w-[100px] h-[100px] rounded-full bg-black"></div>
            <h1 className="text-2xl font-sanista font-semibold">
              {reviewer.name}
            </h1>
            <p className="text-sm font-sanista font-medium">{reviewer.email}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ReviewerCard;
