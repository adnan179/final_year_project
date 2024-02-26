import React from "react";
import UserSidebar from "../../components/users/usersSidebar";
import UserAnnouncements from "../../components/users/userAnnouncements";

const AnnouncementsUserPage = () => {
  return (
    <div className="flex flex-row w-full h-screen">
      <div className="flex w-[20%] min-h-screen">
        <UserSidebar />
      </div>
      <div className="flex w-[80%] justify-center items-center">
        <UserAnnouncements />
      </div>
    </div>
  );
};

export default AnnouncementsUserPage;
