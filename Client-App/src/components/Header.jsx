import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { selectCurrentUser, selectCurrentImage, selectCurrentEmail, logOut } from "../features/auth/authSlice";

import { Avatar, Dropdown, Navbar, DarkThemeToggle } from 'flowbite-react';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(selectCurrentUser);
    const userImage = useSelector(selectCurrentImage);
    const email = useSelector(selectCurrentEmail);

    const HandleLogOut = () => {
        dispatch(logOut());
        navigate('/');
    };

    const content = (
        <Navbar fluid className="fixed w-full z-20 top-0 start-0">
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
                        <Dropdown.Item as={NavLink} to={`/profile/${user}`}>My Profile</Dropdown.Item>
                        {/* DARK MODE TOGGLE for authenticated User  */}
                        <li className="flex items-center gap-1 pl-4 py-1 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                            Mode: <DarkThemeToggle />
                        </li>
                        {/* <Dropdown.Item>Settings</Dropdown.Item> */}
                        {/* <Dropdown.Item>Earnings</Dropdown.Item> */}
                        <Dropdown.Divider />
                        {/* LOGOUT */}
                        <Dropdown.Item onClick={() => HandleLogOut()}>Sign out</Dropdown.Item>
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

            {/* DARK MODE TOGGLE if there is no authenticated User */}
            {!user
                ? <DarkThemeToggle />
                : null}
        </Navbar >
    );

    return content;
};

export default Header;