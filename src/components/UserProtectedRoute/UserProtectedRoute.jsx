import React, { useContext } from 'react';
import { StoreContext } from '../../context/AppContext';
import { Navigate } from 'react-router-dom';

const UserProtectedRoute = ({ children }) => {
  const { token } = useContext(StoreContext);

  // Fallback to localStorage if state not yet updated
  const isAuthenticated = token || localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/user-login" replace />;
  }

  return children;
};

export default UserProtectedRoute;
