import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
//login page import
import LoginPage from "./pages/loginPage";
//admin pages import
import ProjectPage from "./pages/admin pages/projectPage";
import ProjectDetails from "./components/admin/projectDetails";
import ProjectDetailsForm from "./components/admin/projectForm";
import ReviewerPage from "./pages/admin pages/reviewerPage";
import ReviewDatesForm from "./pages/admin pages/reviewDatesForm";
import AnnouncementsPage from "./pages/admin pages/announcementsPage";
import AnnouncementAdminForm from "./components/admin/announcmentAdminForm";
//reviewer pages import
import ReviewerProjectPage from "./pages/reviewer pages/reviewerProjectPage";
import AnnouncementsReviewerPage from "./pages/reviewer pages/announcementsReviewerPage";
//user pages import
import Dashboard from "./pages/users pages/dashboard";
import AnnouncementsUserPage from "./pages/users pages/announcementsUserPage";

import axios from "axios";
import ReviewerForm from "./components/admin/reviewerForm";
import ReviewerProjectDetails from "./components/reviewers/reviewerProjectDetails";
import AssignedProjectsPage from "./pages/reviewer pages/assignedProjects";

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //fetching token from localstorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      decodeToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  // decoding token
  const decodeToken = async (token) => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:4000/login/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { email, role } = response.data;
      setUser({ email, role });
      setIsLoading(false);
    } catch (error) {
      console.error("Error decoding token:", error);
      setIsLoading(false);
    }
  };

  //checking if the user has the requirements to access a particular route
  const ProtectedRoute = ({ element, requiredRole }) => {
    if (isLoading) {
      return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-100">
          <div className="flex flex-col p-16 bg-white gap-3 rounded-xl shadow shadow-white">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#981F2A]"></div>
          </div>
        </div>
      );
    }

    if (!user) {
      return <Navigate to="/" />;
    }

    if (user.role !== requiredRole) {
      return <Navigate to="/" />;
    }

    return element;
  };

  return (
    <BrowserRouter>
      {/* toaster */}
      <Toaster position="top-left" />
      {/* admin routes */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/:adminEmail/admin-dashboard/projects"
          element={
            <ProtectedRoute element={<ProjectPage />} requiredRole="admin" />
          }
        />
        <Route
          path="/:adminEmail/admin-dashboard/projects/:projectNumber"
          element={
            <ProtectedRoute element={<ProjectDetails />} requiredRole="admin" />
          }
        />
        <Route
          path="/:adminEmail/admin-dashboard/projects/form"
          element={
            <ProtectedRoute
              element={<ProjectDetailsForm />}
              requiredRole="admin"
            />
          }
        />
        <Route
          path="/:adminEmail/admin-dashboard/projects/reviewDates"
          element={
            <ProtectedRoute
              element={<ReviewDatesForm />}
              requiredRole="admin"
            />
          }
        />
        <Route
          path="/:adminEmail/admin-dashboard/reviewers"
          element={
            <ProtectedRoute element={<ReviewerPage />} requiredRole="admin" />
          }
        />

        <Route
          path="/:adminEmail/admin-dashboard/reviewers/form"
          element={
            <ProtectedRoute element={<ReviewerForm />} requiredRole="admin" />
          }
        />
        <Route
          path="/:adminEmail/admin-dashboard/announcements"
          element={
            <ProtectedRoute
              element={<AnnouncementsPage />}
              requiredRole="admin"
            />
          }
        />
        <Route
          path="/:adminEmail/admin-dashboard/announcements/form"
          element={
            <ProtectedRoute
              element={<AnnouncementAdminForm />}
              requiredRole="admin"
            />
          }
        />
        {/* Reviewer routes */}
        <Route
          path="/:reviewerEmail/reviewer-dashboard/projects"
          element={
            <ProtectedRoute
              element={<ReviewerProjectPage />}
              requiredRole="reviewer"
            />
          }
        />
        <Route
          path="/:reviewerEmail/reviewer-dashboard/projects/:projectNumber"
          element={
            <ProtectedRoute
              element={<ReviewerProjectDetails />}
              requiredRole="reviewer"
            />
          }
        />
        <Route
          path="/:reviewerEmail/reviewer-dashboard/projectsAssigned"
          element={
            <ProtectedRoute
              element={<AssignedProjectsPage />}
              requiredRole="reviewer"
            />
          }
        />
        <Route
          path="/:reviewerEmail/reviewer-dashboard/announcements"
          element={
            <ProtectedRoute
              element={<AnnouncementsReviewerPage />}
              requiredRole="reviewer"
            />
          }
        />
        {/* user routes */}
        <Route
          path="/:userEmail/user-dashboard"
          element={
            <ProtectedRoute element={<Dashboard />} requiredRole="user" />
          }
        />
        <Route
          path="/:userEmail/user-dashboard/announcements"
          element={
            <ProtectedRoute
              element={<AnnouncementsUserPage />}
              requiredRole="user"
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
