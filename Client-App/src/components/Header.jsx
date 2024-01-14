import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { selectCurrentUser, selectCurrentImage, selectCurrentEmail, logOut } from "../features/auth/authSlice";

import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import DarkModeSwitch from "./common/DarkModeSwitch";

const Header = () => {
    const dispatch = useDispatch();

    const user = useSelector(selectCurrentUser);
    const userImage = useSelector(selectCurrentImage);
    const email = useSelector(selectCurrentEmail);

    const content = (
        <Navbar fluid>
            <Navbar.Brand as={NavLink} to="/">
                {/* TODO set Logo here */}
                {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Fishing Buddies</span>
            </Navbar.Brand>
            {/* Show User Profile only if user is authenticated */}
            {user
                ?
                <div className="flex md:order-2">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="User settings" img={userImage} rounded />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">{user}</span>
                            <span className="block truncate text-sm font-medium">{email}</span>
                        </Dropdown.Header>
                        {/* MY PROFILE PAGE */}
                        <Dropdown.Item as={NavLink} to={`/profiles/${user}`}>My Profile</Dropdown.Item>
                        <DarkModeSwitch />
                        {/* <Dropdown.Item>Settings</Dropdown.Item> */}
                        {/* <Dropdown.Item>Earnings</Dropdown.Item> */}
                        <Dropdown.Divider />
                        {/* LOGOUT */}
                        <Dropdown.Item onClick={() => dispatch(logOut())}>Sign out</Dropdown.Item>
                    </Dropdown>
                    <Navbar.Toggle />

                </div>
                : null
            }

            <Navbar.Collapse>
                <Navbar.Link as={NavLink} to="/">Home</Navbar.Link>
                <Navbar.Link as={NavLink} to="/events">Events</Navbar.Link>
                {/* If User is authenticated show Create(Event) link, otherwise show Login and Register */}
                {user
                    ? <Navbar.Link as={NavLink} to="/create">Create</Navbar.Link>
                    :
                    <>
                        <Navbar.Link as={NavLink} to="/login">Login</Navbar.Link>
                        <Navbar.Link as={NavLink} to="/register">Register</Navbar.Link>
                    </>
                }
            </Navbar.Collapse>

            {/* Dark Mode toggle if there is no authenticated User */}
            {!user
                ? <DarkModeSwitch />
                : null}
        </Navbar >
    );

    return content;
};

export default Header;