import React, { useState } from "react";
import { WhiteLeftArrow } from "../../lib/leftArrow";
import AdminSidebar from "./adminSidebar";
import { Link, useParams, useNavigate } from "react-router-dom";
import { handlePopup } from "../../lib/popUps";
import axios from "axios";

const AnnouncementAdminForm = () => {
  const { adminEmail } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [desc, setDesc] = useState("");
  const [to, setTo] = useState("users");
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);

  //func to handle files
  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(files);
  };

  // func to submit announcement to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create a new FormData object to hold the form data and files
      const formData = new FormData();

      // Append the form fields to the FormData object
      formData.append("to", to);
      formData.append("subject", subject);
      formData.append("desc", desc);

      // Append each file to the FormData object
      for (const file of attachments) {
        formData.append("attachments", file);
      }

      // Send the FormData object to the backend router using fetch or axios
      const response = await axios.post(
        "http://localhost:4000/announcements",
        formData
      );

      if (response.status === 201) {
        // Reset form fields after successful submission
        setTo("Users");
        setSubject("");
        setDesc("");
        setAttachments([]);
        setLoading(false);
        handlePopup("Announcement sent successfully", "success");
        navigate(`/${adminEmail}/admin-dashboard/announcements`);
      }
    } catch (error) {
      console.error("Error sending announcement:", error);
      setLoading(false);
      handlePopup("Error sending announcement", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row w-full h-screen">
      <div className="flex w-[20%] min-h-screen">
        <AdminSidebar />
      </div>
      <div className="flex w-[80%] h-screen p-5">
        <div className="bg-black/90 w-full h-full flex flex-col rounded-lg justify-start py-5 gap-8">
          {/* heading */}
          <div className="flex flex-row w-full items-center">
            <Link to={`/${adminEmail}/admin-dashboard/announcements`}>
              <WhiteLeftArrow />
            </Link>
            <div className="flex flex-col w-full">
              <h2 className="text-white font-poppins text-xl font-medium">
                Send an announcement
              </h2>
              {/* line */}
              <div className=" block w-[90%] px-2 h-[1.25px] bg-white/75"></div>
            </div>
          </div>
          {/* main form */}
          <form onSubmit={handleSubmit} className="flex flex-col pl-16 gap-4">
            {/* to */}
            <div className="flex flex-row gap-2 items-center">
              <p className="text-white font-medium">To:</p>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="bg-white/95 px-1 py-1 rounded"
              >
                <option value="users">Users</option>
                <option value="reviewers">Reviewers</option>
              </select>
            </div>
            {/* subject */}
            <div className="flex">
              <input
                type="text"
                required
                value={subject}
                placeholder="Subject..."
                onChange={(e) => setSubject(e.target.value)}
                className="bg-white/95 rounded w-[90%] px-4 py-2 outline-none focus:ring-2 focus:ring-[#981F2A] shadow"
              />
            </div>
            {/* desc */}
            <div className="flex ">
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Enter your announcement"
                className="bg-white/95 rounded w-[90%] h-[250px] text-black px-3 py-2 outline-none
                focus:ring-2 focus:ring-[#981F2A] shadow"
              />
            </div>
            {/* attachments */}
            <div>
              <input
                type="file"
                multiple
                onChange={handleAttachmentChange}
                className="bg-white/95 shadow rounded"
              />
            </div>
            <div>
              <button
                type="submit"
                className="px-6 py-3 rounded bg-[#981F2A] text-white font-medium shadow"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="flex flex-col p-16 bg-white gap-3 rounded-xl shadow shadow-white">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#981F2A]"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementAdminForm;
