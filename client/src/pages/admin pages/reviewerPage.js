import React from "react";

//components
import AdminSidebar from "../../components/admin/adminSidebar";
import ReviewerCard from "../../components/admin/reviewerCard";

const ReviewerPage = () => {
  return (
    <div className="flex flex-row w-full min-h-screen overflow-y-hidden">
      <div className="flex w-[20%] h-screen">
        <AdminSidebar />
      </div>
      <div className="flex w-[80%] h-screen overflow-y-auto">
        <ReviewerCard />
      </div>
    </div>
  );
};

export default ReviewerPage;
