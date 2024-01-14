import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCurrentToken } from "./authSlice";

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();

    // If user is not authenticated, render Login component
    const content = (
        token
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );

    return content;
};

export default RequireAuth;