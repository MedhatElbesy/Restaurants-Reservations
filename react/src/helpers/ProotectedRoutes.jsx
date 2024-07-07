import { Navigate, Outlet } from "react-router-dom";
import { decryptData } from "./cryptoUtils";

const ProtectedRoute = ({ admin, owner }) => {
  const isLoggedIn = !!decryptData("token");
  const role = decryptData("role");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (admin && role !== "admin" && !owner) {
    return <Navigate to="/" replace />;
  }

  if (owner && role !== "owner" && !admin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const PublicRoute = () => {
  const isLoggedIn = !!sessionStorage.getItem("token");

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export { ProtectedRoute, PublicRoute };
