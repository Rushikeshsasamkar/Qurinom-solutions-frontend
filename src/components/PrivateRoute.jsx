// PrivateRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...props }) => {
  // Check if the user is authenticated
  const isAuthenticated = localStorage.getItem('token') !== null;

  // If authenticated, render the component, otherwise redirect to login
  return isAuthenticated ? (
    <Route {...props} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
