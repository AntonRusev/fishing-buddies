import {
    isRejected,
    isRejectedWithValue,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { router } from "../router/routes";
import { logOut } from "../../features/auth/authSlice";

export const errorHandleMiddleware =
    (store) => (next) => (action) => {
        // isRejectedWithValue Or isRejected
        if (isRejected(action) || isRejectedWithValue(action)) {

            switch (action.payload?.status) {
                case 400:
                    // If request method is GET redirect to /not-found
                    if (action.meta?.baseQueryMeta.request.method === "GET") {
                        router.navigate('/not-found');
                    } else {
                        toast.error('Bad Request');
                    };
                    break;

                case 401:
                    // Finding the www-authentication Header
                    const headerEntriesArray = Array.from(action.meta?.baseQueryMeta.response.headers.entries());

                    // Checking if the 401 is because of expired/invalid Refresh Token
                    if (headerEntriesArray.length > 1 && headerEntriesArray[1][1]?.includes('Bearer error="invalid_token')) {
                        // If Refresh Token has expired, logout the User
                        store.dispatch(logOut());
                        toast.error("Session expired- please login again");
                    } else {
                        toast.error("Unauthorized");
                    };
                    break;

                case 403:
                    toast.error("Forbidden");
                    break;

                case 404:
                    router.navigate('/not-found');
                    break;

                case 500:
                    router.navigate('/server-error');
                    break;

                case "PARSING_ERROR":
                    if (action.payload.originalStatus === 200) {
                        router.navigate('/server-error');
                    } else {
                        toast.error(action.payload?.data);
                    };
                    break;
            };
        };

        return next(action);
    };