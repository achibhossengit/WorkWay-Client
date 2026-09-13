import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/authContext";
import Spinner from "../components/Utilities/Spinner";

const RoleRoute = ({ children, roles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Spinner title="Authentication Processing..." />;
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.user_type)) return <Navigate to="/dashboard" replace />;

  return children;
};

export default RoleRoute;
