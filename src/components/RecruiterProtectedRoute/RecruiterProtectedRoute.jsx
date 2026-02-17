import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../../context/AppContext";

const RecruiterProtectedRoute = ({ children }) => {
  const { recruiterToken, authLoading } = useContext(StoreContext);

  // ✅ Wait until auth is loaded
  if (authLoading) return <div>Loading...</div>;

  // ✅ Redirect if no token
  if (!recruiterToken) return <Navigate to="/recruiter-login" replace />;

  // ✅ Render children if token exists
  return children;
};

export default RecruiterProtectedRoute;
