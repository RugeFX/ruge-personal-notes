import { useAuthContext } from "@/contexts/auth-context";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function GuestRoute({ children }) {
  const { accessToken } = useAuthContext();

  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  return children;
}

GuestRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
