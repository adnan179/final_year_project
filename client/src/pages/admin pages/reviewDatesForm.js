import React, { useState } from "react";
import AdminSidebar from "../../components/admin/adminSidebar";
import { WhiteLeftArrow } from "../../lib/leftArrow";
import { handlePopup } from "../../lib/popUps";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ReviewDatesForm = () => {
  const { adminEmail } = useParams();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = {
        startDate: startDate,
        endDate: endDate,
      };
      const response = await axios.post(
        "http://localhost:4000/projects/update-review-dates",
        formData
      );

      if (response.status === 200) {
        handlePopup(
          "Successfully updated the review dates for the projects",
          "success"
        );
        setStartDate("");
        setEndDate("");
        navigate(`/${adminEmail}/admin-dashboard/projects`);
      }
    } catch (error) {
      console.log(error);
      setStartDate("");
      setEndDate("");
      handlePopup("error updating the review dates", "error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    // whole page
    <div className="flex flex-row w-full h-screen ">
      {/* first grid */}
      <div className="flex w-[20%] h-screen">
        <AdminSidebar />
      </div>
      {/* second grid */}
      <div className="flex w-[80%] p-10">
        {/* form cont */}
        <form
          onSubmit={handleSubmit}
          className="w-full h-[60%] bg-black/90 rounded-md shadow shadow-white px-8 py-2 overflow-y-auto"
        >
          <div className="flex flex-row justify-start mt-5 pb-5">
            <Link to={`/${adminEmail}/admin-dashboard/projects`}>
              <WhiteLeftArrow />
            </Link>
            <h1 className="text-white text-2xl font-semibold font-poppins">
              Update the review dates
            </h1>
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <label className="text-white text-lg font-poppins font-medium">
              Start date:
            </label>
            <input
              className="flex w-[40%] bg-[#E5DFDF] px-4 py-2 rounded focus:ring-1 focus:ring-[#981F2A]"
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <label className="text-white text-lg font-poppins font-medium">
              End date:
            </label>
            <input
              className="flex w-[40%] bg-[#E5DFDF] px-4 py-2 rounded focus:ring-1 focus:ring-[#981F2A]"
              type="date"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="flex mt-5 py-2 px-4 text-white font-medium font-poppins bg-[#981F2A] cursor-pointer rounded"
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewDatesForm;
