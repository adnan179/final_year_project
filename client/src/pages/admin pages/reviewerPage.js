import React from "react";

//components
import AdminSidebar from "../../components/admin/adminSidebar";
import ReviewerCard from "../../components/admin/reviewerCard";

const ReviewerPage = () => {
  return (
    <div className="flex flex-row w-full h-screen bg-gradient-to-r from-[#111111] to-[#2C3E50]">
      <div className="flex w-[20%] h-screen">
        <AdminSidebar />
      </div>
      <div className="flex w-[80%] h-screen">
        <ReviewerCard />
      </div>
    </div>
  );
};

export default ReviewerPage;
