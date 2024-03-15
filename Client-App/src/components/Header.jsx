import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Navbar, DarkThemeToggle } from 'flowbite-react';

import { selectUser, logOut } from "../features/auth/authSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(selectUser);

    const HandleLogOut = () => {
        dispatch(logOut());
        navigate('/');
    };

    const content = (
        <Navbar
            className="fixed w-full z-20 top-0 start-0 text-white bg-gray-900"
            fluid
        >
            {/* FISHING BUDDIES LOGO */}
            <Navbar.Brand
                as={NavLink}
                to="/"
            >
                <div className="align-center font-serif">
                    <h3 className="text-cyan-600 font-light text-2xl leading-1.3 tracking-wide">
                        Fishing <span className="bg-cyan-600 text-gray-900 inline-block leading-1.8 px-2">Buddies</span>
                    </h3>
                </div>
            </Navbar.Brand>

            <div className="flex sm:justify-end md:w-40 lg:w-48 md:order-2">
                {/* Show User Profile only if user is authenticated */}
                {user.username
                    ?
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt="User settings"
                                img={user.image}
                                rounded
                            />
                        }
                    >
                        {/* USERNAME AND EMAIL */}
                        <Dropdown.Header>
                            <span className="block text-sm">
                                {user.username}
                            </span>

                            <span className="block truncate text-sm font-medium">
                                {user.email}
                            </span>
                        </Dropdown.Header>

                        {/* MY PROFILE PAGE */}
                        <Dropdown.Item
                            as={NavLink}
                            to={`/profile/${user.username}`}
                        >
                            My Profile
                        </Dropdown.Item>

                        {/* DARK MODE TOGGLE for authenticated User  */}
                        <li className="flex items-center gap-1 pl-4 py-1 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                            Theme: <DarkThemeToggle />
                        </li>

                        <Dropdown.Divider />

                        {/* LOGOUT */}
                        <Dropdown.Item onClick={() => HandleLogOut()}>
                            Sign out
                        </Dropdown.Item>
                    </Dropdown>
                    :
                    // DARK MODE TOGGLE if there is no authenticated User, small screen size
                    !user.username && <DarkThemeToggle className="hidden md:inline-block" />
                }

                {/* TOGGLE BUTTON FOR NAV BAR */}
                <Navbar.Toggle className="text-white" />
            </div>


            <Navbar.Collapse>
                <Navbar.Link
                    className="text-white"
                    as={NavLink}
                    to="/">
                    Home
                </Navbar.Link>

                <Navbar.Link
                    className="text-white"
                    as={NavLink}
                    to="/about"
                >
                    About
                </Navbar.Link>

                <Navbar.Link
                    className="text-white"
                    as={NavLink}
                    to="/events"
                >
                    Events
                </Navbar.Link>

                {/* If User is authenticated show Create(Event) link, otherwise show Login and Register */}
                {user.username
                    ? <Navbar.Link
                        className="text-white"
                        as={NavLink}
                        to="/create"
                    >
                        Create
                    </Navbar.Link>
                    :
                    <>
                        <Navbar.Link
                            className="text-white"
                            as={NavLink}
                            to="/login"
                        >
                            Login
                        </Navbar.Link>

                        <Navbar.Link
                            className="text-white"
                            as={NavLink}
                            to="/register"
                        >
                            Register
                        </Navbar.Link>

                        {/* DARK MODE TOGGLE if there is no authenticated User, large screen size */}
                        <Navbar.Link
                            className="flex items-center text-white md:hidden"
                            as={NavLink}
                            to="/register"
                        >
                            Theme: <DarkThemeToggle className="" />
                        </Navbar.Link>
                    </>
                }
            </Navbar.Collapse>
        </Navbar >
    );

    return content;
};

export default Header;