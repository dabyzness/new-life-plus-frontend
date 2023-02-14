import { Navigate } from "react-router-dom";
import { User } from "../../App";

export interface ProtectedRouteProps {
  user: User | null;
  children: JSX.Element;
}

function ProtectedRoute(props: ProtectedRouteProps) {
  if (!props.user) {
    return <Navigate to="/login" />;
  }

  return props.children;
}

export default ProtectedRoute;
