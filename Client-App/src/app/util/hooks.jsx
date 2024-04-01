import { useLocation } from "react-router-dom";

// Hook for getting the search params from the URL query
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

export default useQuery;