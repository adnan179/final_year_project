import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { handlePopup, ConfirmationPopup } from "../../lib/popUps";
import axios from "axios";

const AnnouncementsAdmin = () => {
  const { adminEmail } = useParams();
  const [search, setSearch] = useState();
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);

  useEffect(() => {
    // Function to fetch announcements from MongoDB
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:4000/announcements");
        setAnnouncements(response.data);
        setFilteredAnnouncements(response.data);
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

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    filterAnnouncements(e.target.value);
  };

  // Function to filter announcements based on search input
  const filterAnnouncements = (searchQuery) => {
    const filtered = announcements.filter((announcement) =>
      announcement.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAnnouncements(filtered);
  };
  const handleDeleteAnnouncement = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:4000/announcements/${id}`
      );
      if (response.status === 201) {
        handleClosePopup();
        handlePopup("successfully deleted announcement", "success");
        setLoading(false);
        window.location.reload();
      }
    } catch (error) {
      console.log("Error deleting announcement", error);
      handlePopup("Error deleting announcement", "error");
      setLoading(false);
      setAnnouncements([]);
      setFilteredAnnouncements([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen px-8 py-4 bg-white gap-3">
      {/* loading animation */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-100">
          <div className="flex flex-col p-16 bg-white gap-3 rounded-xl shadow shadow-white">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#981F2A]"></div>
          </div>
        </div>
      )}
      {/* new and search */}
      <div className="flex flex-row w-full justify-between">
        <div className="flex">
          <Link
            to={`/${adminEmail}/admin-dashboard/announcements/form`}
            className="px-6 py-2 bg-[#981F2A] text-white font-medium rounded"
          >
            New
          </Link>
        </div>
        <div className="flex">
          <input
            className="rounded px-4 py-2 bg-black/90 text-white"
            placeholder="Search..."
            onChange={handleSearchChange}
            value={search}
          />
        </div>
      </div>
      {/* announcements */}
      {filteredAnnouncements &&
        filteredAnnouncements
          .slice()
          .reverse()
          .map((a) => (
            <div
              key={a._id}
              className="flex justify-between w-full bg-black/90 rounded px-4 py-4 shadow cursor-pointer"
              onClick={() => handleAnnouncementClick(a)}
            >
              <h1 className="text-white font-semibold font-poppins">
                {a.subject}
              </h1>
              <h1 className="text-white/50 font-poppins">
                {new Date(a.date).toISOString().split("T")[0]}
              </h1>
            </div>
          ))}
      {announcements.length === 0 && (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <h1 className="text-xl text-black font-medium">
            No announcements done yet!!
          </h1>
          <p className="text-gray-800">
            Add a new announcement by clicked{" "}
            <span className="text-[#981F2A]">new button</span>
          </p>
        </div>
      )}
      {/* Popup to display announcement details */}
      {selectedAnnouncement && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white p-8 rounded-lg w-4/6">
            <div className="flex flex-row gap-3">
              <button
                className="sticky flex justify-center px-4 py-2 rounded font-medium bg-[#981F2A] text-white cursor-pointer transition duration-300 ease-in-out hover:scale-105"
                onClick={handleClosePopup}
              >
                Close
              </button>
              <button
                className="sticky flex justify-center px-4 py-2 rounded font-medium bg-[#981F2A] text-white cursor-pointer transition duration-300 ease-in-out hover:scale-105"
                onClick={() => setConfirmPopup(true)}
              >
                Delete
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4 mt-4">
              {selectedAnnouncement && selectedAnnouncement.date}
            </p>
            <p className="uppercase">
              <span className="font-medium">To:</span>{" "}
              {selectedAnnouncement && selectedAnnouncement.to}
            </p>
            <h2 className="text-xl font-semibold mb-4 mt-5">
              {selectedAnnouncement && selectedAnnouncement.subject}
            </h2>
            <p className="mb-4">
              {selectedAnnouncement && selectedAnnouncement.desc}
            </p>
            {selectedAnnouncement &&
              selectedAnnouncement.attachments.length > 0 && (
                <h2 className="mb-4 font-medium text-[#981F2A]">
                  {selectedAnnouncement.attachments.length} Attachments
                </h2>
              )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {selectedAnnouncement.attachments &&
                selectedAnnouncement.attachments.map((attachment, index) => (
                  <a
                    key={index}
                    href={attachment.downloadUrl}
                    download={attachment.fileName}
                    className="text-gray-700 text-sm p-8 flex rounded justify-center items-center border-2 shadow-lg cursor-pointer
                    transition duration-300 ease-in-out hover:scale-105"
                  >
                    {attachment._doc.fileName}
                  </a>
                ))}
            </div>
          </div>
        </div>
      )}
      {/* Confirmation pop-up */}
      {confirmPopup && (
        <ConfirmationPopup
          message="Are you sure you want to delete this project?"
          onCancel={() => setConfirmPopup(false)} // Close the confirmation pop-up
          onConfirm={() => handleDeleteAnnouncement(selectedAnnouncement._id)} // Call the handleDelete function on confirmation
        />
      )}
    </div>
  );
};

export default AnnouncementsAdmin;
