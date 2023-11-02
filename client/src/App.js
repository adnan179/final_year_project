import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import your pages/components here
//admin pages/components
import ProjectPage from "./pages/admin pages/projectPage";
import ReviewerPage from "./pages/admin pages/reviewerPage";
import ProjectDetails from "./components/admin/projectDetails";
import ProjectDetailsForm from "./components/admin/projectForm";
import LoginPage from "./pages/loginPage";
import GuideDetails from "./components/admin/guideDetails";
import StudentDetails from "./components/admin/studentDetails";
import ReviewerForm from "./components/admin/reviewerForm";
import AnnouncementsPage from "./pages/admin pages/announcementsPage";
import AdminDashboard from "./pages/admin pages/adminDashboard";

//reviewers pages/components
import ReviewerDashboard from "./pages/reviewer pages/reviewerDashboard";
import ReviewerProjectPage from "./pages/reviewer pages/reviewerProjectPage";
import ReviewerDetails from "./components/admin/reviewerDetails";
//user's pages/components
import StudentDashboard from "./pages/users pages/studentDashboard";
import GuideDashboard from "./pages/users pages/guideDashboard";

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate user login and role here
  // Replace this with your actual authentication mechanism
  useEffect(() => {
    // Check if the user is authenticated and set user data
    // Example: Check if a token is in local storage and decode it
    const token = localStorage.getItem("token");
    if (token) {
      // Decode the token and set user data (e.g., user role)
      const decodedToken = decodeToken(token);
      setUser(decodedToken);
    }
    setIsLoading(false); // Set loading to false when user data is retrieved
  }, []);

  // Function to decode the JWT token
  const decodeToken = (token) => {
    // Replace this with your JWT decoding logic
    // This is just a simplified example
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(atob(base64));
  };

  const ProtectedRoute = ({ element, requiredRole }) => {
    if (isLoading) {
      // If still loading, show a loading message or spinner
      return <div>Loading...</div>;
    }

    if (!user) {
      // User not authenticated, redirect to login page
      return <Navigate to="/" />;
    }

    const role = user?.role;
    if (requiredRole && role !== requiredRole) {
      // User doesn't have the required role, handle this as needed (e.g., show an error message)
      return <div>You don't have permission to access this page.</div>;
    }

    return element;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* login Route */}
        <Route path="/" element={<LoginPage />} />
        {/* Admin Routes */}
        <Route
          path="/:adminEmail/admin-dashboard"
          element={
            <ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />
          }
        />
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
          path="/:adminEmail/admin-dashboard/projects/:projectNumber/guide/:guideEmployeeId"
          element={
            <ProtectedRoute element={<GuideDetails />} requiredRole="admin" />
          }
        />
        <Route
          path="/:adminEmail/admin-dashboard/projects/:projectNumber/student/:studentRollnumber"
          element={
            <ProtectedRoute element={<StudentDetails />} requiredRole="admin" />
          }
        />
        <Route
          path="/:adminEmail/admin-dashboard/projects/form"
          element={<ProtectedRoute element={<ProjectDetailsForm />} />}
          requiredRole="admin"
        />
        <Route
          path="/:adminEmail/admin-dashboard/reviewers"
          element={
            <ProtectedRoute element={<ReviewerPage />} requiredRole="admin" />
          }
        />
        <Route
          path="/:adminEmail/admin-dashboard/reviewers/:reviewerEmployeeId"
          element={
            <ProtectedRoute
              element={<ReviewerDetails />}
              requiredRole="admin"
            />
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

        {/* Reviewer routes */}
        <Route
          path="/:reviewerEmail/reviewer-dashboard"
          element={
            <ProtectedRoute
              element={<ReviewerDashboard />}
              requiredRole="reviewer"
            />
          }
        />

        <Route
          path="/:reviewerEmail/reviewer-dashboard/projects"
          element={
            <ProtectedRoute
              element={<ReviewerProjectPage />}
              requiredRole="reviewer"
            />
          }
        />

        {/* user's routes */}
        <Route
          path="/:userEmail/user-dashboard"
          element={
            <ProtectedRoute
              element={<StudentDashboard />}
              requiredRole="user"
            />
          }
        />
        <Route
          path="/:userEmail/user-dashboard"
          element={
            <ProtectedRoute element={<GuideDashboard />} requiredRole="user" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
