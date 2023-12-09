import { useAuthContext } from "@/contexts/auth-context";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function PrivateRoute({ children }) {
  const { accessToken } = useAuthContext();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
