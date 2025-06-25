import { Navigate } from "react-router";

const PrivateRoutes = ({ children }) => {
    const condition = false;
  return condition ? children : <Navigate to={'/login'}/>;
};

export default PrivateRoutes;
