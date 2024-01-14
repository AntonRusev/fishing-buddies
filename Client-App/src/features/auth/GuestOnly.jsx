import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCurrentToken } from "./authSlice";

const GuestOnly = () => {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();

    // If user is authenticated, render Home component
    const content = (
        token
            ? <Navigate to="/" state={{ from: location }} replace /> 
            : <Outlet /> 
    );

    return content;
};

export default GuestOnly;