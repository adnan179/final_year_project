import React, { useEffect, useState } from "react";
import { handlePopup } from "../../lib/popUps";
import axios from "axios";
import UserSidebar from "../../components/users/usersSidebar";

const Grades = () => {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState();
  const [students, setStudents] = useState([]);
  const projectNumber = localStorage.getItem("projectNumber");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/projects/by-number/${projectNumber}`
        );
        if (response.status === 200) {
          setProject(response.data.project);
          setStudents(response.data.students);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        handlePopup("Error fetching grades & feedbacks", "error");
        setLoading(false);
      }
    };
    fetchData();
  }, [projectNumber]);

  //loading animation
  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-100">
        <div className="flex flex-col p-16 bg-white gap-3 rounded-xl shadow shadow-white">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#981F2A]"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-row w-full h-screen">
      <div className="flex w-[20%] h-full overflow-y-hidden">
        <UserSidebar />
      </div>
      <div className="flex flex-col w-[80%] h-full overflow-y-auto p-10">
        <div className="flex">
          <h1 className="text-2xl font-bold text-black">
            {projectNumber} Grades & Feedbacks
          </h1>
        </div>
        <div className="flex flex-col overflow-x-auto mt-5 gap-3">
          <h2 className="text-md font-medium">Grades:</h2>
          <table className="table-auto">
            <thead>
              <tr className="border border-black">
                <th className="px-4 py-2 font-medium border border-black">
                  Students
                </th>
                <th className="px-4 py-2 font-medium border border-black">
                  Review 1(40marks)
                </th>
                <th className="px-4 py-2 font-medium border border-black">
                  Review 2(30marks)
                </th>
                <th className="px-4 py-2 font-medium border border-black">
                  Review 3(30marks)
                </th>
                <th className="px-4 py-2 font-medium border border-black">
                  Total(100marks)
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.name}>
                  <td className="border border-black px-4 py-2">
                    {student.name}
                  </td>
                  <td className="border border-black px-4 py-2">
                    {student.review1.totalMarks
                      ? student.review1.totalMarks || 0
                      : "not graded yet"}
                  </td>
                  <td className="border border-black px-4 py-2">
                    {student.review2.totalMarks
                      ? student.review2.totalMarks || 0
                      : "not graded yet"}
                  </td>
                  <td className="border border-black px-4 py-2">
                    {student.review3.totalMarks
                      ? student.review3.totalMarks || 0
                      : "not graded yet"}
                  </td>
                  <td className="border border-black px-4 py-2">
                    {(student.review1 ? student.review1.totalMarks || 0 : 0) +
                      (student.review2 ? student.review2.totalMarks || 0 : 0) +
                      (student.review3 ? student.review3.totalMarks || 0 : 0) ||
                      "Not graded yet"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col mt-5 gap-3">
          <h2 className="text-md font-medium">Feedbacks:</h2>
          <div>
            {project && project.Feedbacks ? (
              project.Feedbacks.map((feed, index) => (
                <p className="text-sm">
                  <span className="font-medium">feedback-{index + 1}:</span>{" "}
                  {feed}
                </p>
              ))
            ) : (
              <p className="text-md text-red-600">no feedbacks posted yet!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grades;
