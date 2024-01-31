import { NavLink } from "react-router-dom";
import { Avatar, Dropdown } from 'flowbite-react';

import FollowButton from './FollowButton';

const ProfileCard = ({ profile }) => {
    const content = (
        <Dropdown
            label={<Avatar alt="User settings" img={profile.image} rounded />}
            arrowIcon={false}
            inline
        >
            <div className="w-64 p-3">
                <div className="mb-2 flex items-center justify-between">
                    <NavLink to={`/profiles/${profile.username}`}>
                        <img
                            className="h-10 w-10 rounded-full"
                            src={profile.image}
                            alt="user"
                        />
                    </NavLink>

                    <FollowButton profile={profile} />
                </div>
                <p id="profile-popover" className="text-base font-semibold leading-none text-gray-900 dark:text-white">
                    <NavLink to={`/profiles/${profile.username}`} >
                        {profile.username}
                    </NavLink>
                </p>
                <p className="mb-3 text-sm font-normal">
                    <NavLink>
                        {profile.username}
                    </NavLink>
                </p>
                <p className="mb-4 text-sm">
                    {profile.bio}
                </p>
                <ul className="flex text-sm">
                    <li className="me-2">
                        <NavLink className="hover:underline">
                            <span className="font-semibold text-gray-900 dark:text-white">{profile.followingCount} </span>
                            <span>Following</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="hover:underline">
                            <span className="font-semibold text-gray-900 dark:text-white">{profile.followersCount} </span>
                            <span>Followers</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </Dropdown >
    );

    return content;
};

export default ProfileCard;