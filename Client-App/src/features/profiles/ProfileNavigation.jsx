import { NavLink, useLocation } from "react-router-dom";
import { Dropdown, Button } from 'flowbite-react';

import getProfilePredicate from "../../utils/getProfilePredicate";

const ProfileNavigation = ({ username }) => {
    const { pathname } = useLocation();

    // Getting the Profile predicate from the url path
    const predicate = getProfilePredicate(pathname);

    const content = (
        <div className="flex flex-col items-center w-full">
            {/* SELECT OPTIONS DROPDOWN */}
            {/* Only shown on small screen */}
            <div className="sm:hidden flex w-full p-2">
                <Dropdown
                    renderTrigger={() => (
                        <Button className="w-full" color="gray">
                            {predicate.toUpperCase() || 'Profile Menu'}
                        </Button>
                    )}
                    dismissOnClick={true}
                    className="w-full -ml-2"
                >
                    <Dropdown.Item as={NavLink} to={`/profile/${username}`}>
                        About
                    </Dropdown.Item>
                    <Dropdown.Item as={NavLink} to={`/profile/${username}/photos`}>
                        Photos
                    </Dropdown.Item>
                    <Dropdown.Item as={NavLink} to={`/profile/${username}/events`}>
                        Events
                    </Dropdown.Item>
                    <Dropdown.Item as={NavLink} to={`/profile/${username}/followers`}>
                        Followers
                    </Dropdown.Item>
                    <Dropdown.Item as={NavLink} to={`/profile/${username}/following`}>
                        Following
                    </Dropdown.Item>
                </Dropdown>
            </div>

            {/* LINKS */}
            <ul className="hidden w-3/4 xl:max-w-screen-xl text-sm font-medium text-center text-gray-500 rounded-lg shadow-[rgba(0,0,0,0.1)_0px_1px_1px_0px] sm:flex dark:divide-gray-700 dark:text-gray-400">
                <li className="w-full focus-within:z-10">
                    <NavLink
                        to={`/profile/${username}`}
                        className={`inline-block w-full p-4 border-r border-gray-200 dark:border-gray-700 rounded-bl hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:hover:bg-gray-600  ${predicate === "about" ? "text-gray-900 bg-gray-100 dark:bg-gray-700 active dark:text-white" : "bg-white  dark:bg-gray-800"}`}
                        aria-current="page"
                    >
                        About
                    </NavLink>
                </li>
                <li className="w-full focus-within:z-10">
                    <NavLink
                        to={`/profile/${username}/photos`}
                        className={`inline-block w-full p-4 border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:hover:bg-gray-600  ${predicate === "photos" ? "text-gray-900 bg-gray-100 dark:bg-gray-700 active dark:text-white" : "bg-white  dark:bg-gray-800"}`}
                    >
                        Photos
                    </NavLink>
                </li>
                <li className="w-full focus-within:z-10">
                    <NavLink
                        to={`/profile/${username}/events`}
                        className={`inline-block w-full p-4 border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:hover:bg-gray-600  ${predicate === "events" ? "text-gray-900 bg-gray-100 dark:bg-gray-700 active dark:text-white" : "bg-white  dark:bg-gray-800"}`}
                    >
                        Events
                    </NavLink>
                </li>
                <li className="w-full focus-within:z-10">
                    <NavLink
                        to={`/profile/${username}/followers`}
                        className={`inline-block w-full p-4 border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:hover:bg-gray-600  ${predicate === "followers" ? "text-gray-900 bg-gray-100 dark:bg-gray-700 active dark:text-white" : "bg-white  dark:bg-gray-800"}`}
                    >
                        Followers
                    </NavLink>
                </li>
                <li className="w-full focus-within:z-10">
                    <NavLink
                        to={`/profile/${username}/following`}
                        className={`inline-block w-full p-4 border-s-0 border-gray-200 dark:border-gray-700 rounded-br hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:hover:bg-gray-600  ${predicate === "following" ? "text-gray-900 bg-gray-100 dark:bg-gray-700 active dark:text-white" : "bg-white  dark:bg-gray-800"}`}
                    >
                        Following
                    </NavLink>
                </li>
            </ul>
        </div >
    );

    return content;
};
export default ProfileNavigation;