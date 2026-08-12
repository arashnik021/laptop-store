import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {return children;}

  return (
    <Navigate to="/login" replace state={{from: location.pathname,}}/>
  );
}

export default ProtectedRoute;
