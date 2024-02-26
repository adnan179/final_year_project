import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AdminReviewerPopup, handlePopup } from "../../lib/popUps";

const ReviewerCard = () => {
  const [search, setSearch] = useState("");
  const [reviewers, setReviewers] = useState([]);
  const [filteredReviewers, setFilteredReviewers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedReviewer, setSelectedReviewer] = useState(null);

  useEffect(() => {
    // Fetch reviewer data from your API
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:4000/reviewers/getAllReviewers"
        );
        setReviewers(response.data.reviewers);
        if (response.data.reviewers) {
          handlePopup("successfully fetched reviewers data", "success");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching reviewer data: ", error);
        handlePopup("Error fetching reviewer data", "error");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = Array.isArray(reviewers)
      ? reviewers.filter((reviewer) =>
          reviewer.name.toLowerCase().includes(search.toLowerCase())
        )
      : [];
    setFilteredReviewers(filtered);
  }, [search, reviewers]);

  if (loading) {
    // Display loading spinner while waiting for the form submission
    return (
      <div className="flex w-[80%] h-screen justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#981F2A]"></div>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full h-screen p-5">
      <div className="flex flex-row justify-between w-full px-8">
        <Link to={"form"}>
          <button className="flex font-sanista font-semibold px-6 py-3 bg-[#981F2A] text-white rounded shadow-lg text-md">
            Assign a project
          </button>
        </Link>
        <div>
          <label className="text-sm text-gray-700">
            Search using employeeId
          </label>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex w-full font-sanista text-lg px-4 py-2 rounded-lg bg-[#E5DFDF] 
            focus:ring-[#981F2A] focus:ring-2 outline-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 pt-5 gap-3">
        {Array.isArray(filteredReviewers) &&
          filteredReviewers.map((reviewer) => (
            <div
              onClick={() => setSelectedReviewer(reviewer)}
              key={reviewer._id} // Assuming "_id" is the unique identifier in your data
              className="flex flex-col justify-between items-center px-2 py-4 bg-[#E5DFDF] rounded w-[200px] h-[200px] 
            shadow-md cursor-pointer"
            >
              <div className="w-[80px] h-[80px] rounded-full bg-black"></div>
              <h1 className="text-md font-sanista font-semibold">
                {reviewer.name}
              </h1>
              <p className="text-sm font-medium font-sanista">
                {reviewer.email}
              </p>
            </div>
          ))}
      </div>
      {selectedReviewer && (
        <AdminReviewerPopup
          reviewer={selectedReviewer}
          onCancel={() => setSelectedReviewer(null)}
        />
      )}
    </div>
  );
};

export default ReviewerCard;
