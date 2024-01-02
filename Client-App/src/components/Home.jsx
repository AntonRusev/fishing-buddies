import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { setCredentials, logOut } from "../features/auth/authSlice";
import EventsList from "../features/events/EventsList";

const Home = () => {
    const [currentUser, setCurrentUser] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // For development only / TODO
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userData"));
        if (user) {
            dispatch(setCredentials({ ...user }));
            setCurrentUser(user);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userData");
        dispatch(logOut());
        setCurrentUser(null);

        navigate('/');
    };

    const content = (
        <section>
            <p>Hello {currentUser
                ? currentUser.username
                : <span>guest</span>
            } </p>
            Welcome to Fishing Buddies!

            <div>
                {currentUser
                    ? <button onClick={handleLogout}>Logout</button>
                    :
                    <div>
                        <NavLink to='/login' >Login</NavLink>
                        <span> or </span>
                        <NavLink to='/register' >Register</NavLink>
                    </div>
                }
            </div>
            <EventsList />
        </section>
    );

    return content;
}

export default Home;