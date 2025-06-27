import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/authContext";
import Spinner from "../components/Utilities/Spinner";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <Spinner title="Authentication Proseccing..." />
  else return user ? children : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
