import React, { useEffect, useState } from "react";
import axios from "axios";
import { handlePopup } from "../../lib/popUps";

const UserAnnouncements = () => {
  const [search, setSearch] = useState();
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Function to fetch announcements from MongoDB
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:4000/announcements/users"
        );
        setAnnouncements(response.data);
        handlePopup("successfully fetched all announcements", "success");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching announcements:", error);
        setLoading(false);
        handlePopup("error fetching announcements", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  // Function to handle click on an announcement
  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    console.log(selectedAnnouncement);
  };

  // Function to handle closing the popup
  const handleClosePopup = () => {
    setSelectedAnnouncement(null);
  };

  return (
    <div className="flex flex-col w-full min-h-screen px-8 py-4 bg-white gap-2">
      {/* loading animation */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="flex flex-col p-16 bg-white gap-3 rounded-xl shadow shadow-white">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#981F2A]"></div>
          </div>
        </div>
      )}
      {/*search */}
      <div className="flex w-full justify-end">
        <input
          className="rounded px-4 py-2 bg-black/90 text-white"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      {announcements &&
        announcements.map((a) => (
          <div
            key={a._id}
            className="flex justify-start w-full bg-black/90 rounded px-2 py-4 shadow cursor-pointer"
            onClick={() => handleAnnouncementClick(a)}
          >
            <h1 className="text-white font-semibold font-poppins">
              {a.subject}
            </h1>
          </div>
        ))}

      {/* Popup to display announcement details */}
      {selectedAnnouncement && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white p-8 rounded-lg">
            <button
              className="sticky flex justify-center px-4 py-2 rounded font-medium bg-[#981F2A] text-white cursor-pointer transition duration-300 ease-in-out hover:scale-105"
              onClick={handleClosePopup}
            >
              Close
            </button>
            <h2 className="text-xl font-semibold mb-4 mt-5">
              {selectedAnnouncement && selectedAnnouncement.subject}
            </h2>
            <p className="mb-4">
              {selectedAnnouncement && selectedAnnouncement.desc}
            </p>
            <h2 className="mb-4 font-medium">Attachments:</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {selectedAnnouncement.attachments &&
                selectedAnnouncement.attachments.map((attachment, index) => (
                  <a
                    key={index}
                    href={attachment.downloadUrl}
                    download={attachment.fileName}
                    className="text-black flex  rounded justify-end items-center border shadow cursor-pointer"
                  >
                    {attachment._doc.fileName}
                  </a>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAnnouncements;
