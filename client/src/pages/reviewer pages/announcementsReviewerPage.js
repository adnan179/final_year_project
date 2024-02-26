import React from "react";
import ReviewerSidebar from "../../components/reviewers/reviewerSidebar";
import ReviewerAnnouncements from "../../components/reviewers/reviewerAnnouncements";

const AnnouncementsReviewerPage = () => {
  return (
    <div className="flex flex-row w-full min-h-screen">
      <div className="flex w-[20%] h-screen">
        <ReviewerSidebar />
      </div>
      <div className="flex w-[80%] h-screen">
        <ReviewerAnnouncements />
      </div>
    </div>
  );
};

export default AnnouncementsReviewerPage;
