import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import MyApplications from "./MyApplications";
import EmployerApplications from "./EmployerApplications";

const Applications = () => {
  const { user } = useContext(AuthContext);
  return user?.user_type === "Employer" ? (
    <EmployerApplications />
  ) : (
    <MyApplications />
  );
};

export default Applications;
