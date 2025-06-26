// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.user.currentUser?.token);

  const location = useLocation();

  // console.log(currentUser);

  if (!currentUser) {
    // 🚫 Not logged in? Redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ✅ Logged in? Render the child route/component
  return <Outlet />;
};

export default ProtectedRoute;
