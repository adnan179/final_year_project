import React from "react";
import ReviewerSidebar from "../../components/reviewers/reviewerSidebar";
import ReviewerProjectCards from "../../components/reviewers/reviewerProjectCards";

const ReviewerProjectPage = () => {
  return (
    <div className="flex flex-row w-full h-screen bg-gradient-to-r from-[#111111] to-[#2C3E50]">
      <div className="flex w-[20%] h-screen">
        <ReviewerSidebar />
      </div>
      <div className="flex w-[80%] h-screen">
        <ReviewerProjectCards />
      </div>
    </div>
  );
};

export default ReviewerProjectPage;
