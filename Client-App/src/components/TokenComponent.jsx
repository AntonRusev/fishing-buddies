import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRefreshTokenApiMutation } from "../features/auth/authApiSlice";
import { setCredentials, selectUser } from "../features/auth/authSlice";

let TokenComponent = () => {
    const user = useSelector(selectUser);

    const [refreshTokenApi] = useRefreshTokenApiMutation();
    const dispatch = useDispatch();

    // The timeout used for sending Refresh Token request
    let refreshTokenTimeout;

    useEffect(() => {
        // Upon User authentication, kick-start the Refresh Token functionality
        if (user.username != null) {
            startRefreshTokenTimer(user);
        } else {
            stopRefreshTokenTimer();
        };
    }, [user.username]);

    function refreshToken() {
        // Stop the previous Refresh Token timer
        stopRefreshTokenTimer();

        try {
            if (user.username != null) {
                refreshTokenApi()
                    .unwrap()
                    .then((payload) => {
                        // Start the new Refresh Token timer
                        startRefreshTokenTimer(payload);
                        // Update the local state User info from the new Refresh Token
                        dispatch(setCredentials(payload));
                    });
            };
        } catch (error) {
            console.log(error);
        };
    };

    function startRefreshTokenTimer(user) {
        // Get the Token and its timeout(expiration time) and set the local state timeout to be 30 seconds before the Token expires
        const jwtToken = JSON.parse(atob(user.token.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (30 * 1000);

        // Start the Refresh Token timer and send request for new Refresh Token 30 seconds before it expires
        refreshTokenTimeout = setTimeout(() => {
            refreshToken();
        }, timeout);

        console.log({ refreshTokenTimeout })
    };

    function stopRefreshTokenTimer() {
        // Stop the Refresh Token Timer
        clearTimeout(refreshTokenTimeout);
    };

    return (<></>);
};

TokenComponent = React.memo(TokenComponent);

export default TokenComponent;