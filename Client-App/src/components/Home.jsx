import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { setCredentials, logOut } from "../features/auth/authSlice";
import EventsList from "../features/events/EventsList";

const Home = () => {
    const dispatch = useDispatch();

    // For development only / TODO
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userData"));
        if (user) {
            dispatch(setCredentials({ ...user }));
        };
    }, []);


    const content = (
        <section style={{backgroundColor: "darkgray"}}>
            <h2>Welcome to Fishing Buddies!</h2>

            {/* <EventsList /> */}
        </section>
    );

    return content;
}

export default Home;