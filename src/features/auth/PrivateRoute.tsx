import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

interface PrivateRouteProps {
  children: React.ReactElement;
  roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const { User } = useAppSelector((state) => state.auth);

  if (
    roles &&
    User &&
    !roles.includes(User.Roles.find((role) => roles.includes(role)) || "")
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
