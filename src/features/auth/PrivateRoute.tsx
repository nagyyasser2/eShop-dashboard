import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

interface PrivateRouteProps {
  children: React.ReactElement;
  roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
