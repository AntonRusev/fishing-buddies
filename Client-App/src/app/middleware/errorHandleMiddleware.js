import {
    isRejected,
    isRejectedWithValue,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { router } from "../router/routes";

export const errorHandleMiddleware =
    (api) => (next) => (action) => {
        // isRejectedWithValue Or isRejected
        if (isRejected(action) || isRejectedWithValue(action)) {
            console.log(action)

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
                    toast.error("Unauthorized")
                    break;

                case 403:
                    toast.error("Forbidden");
                    break;

                case 404:
                    router.navigate('/not-found');
                    break;

                case 500:
                    toast.error('navigate to /server-error');
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