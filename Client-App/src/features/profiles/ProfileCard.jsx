import { NavLink } from "react-router-dom";

import FollowButton from './FollowButton';

const ProfileCard = ({ profile }) => {
    const content = (
        <div className="w-full min-w-64 max-w-72 p-3 mx-auto rounded-lg bg-white text-gray-500 dark:bg-gray-700 dark:text-gray-300">
            <div className="mb-2 flex items-center justify-between">
                {/* IMAGE */}
                <NavLink to={`/profile/${profile.username}`}>
                    <img
                        className="h-10 w-10 rounded-full"
                        src={profile.image || '/user.png'}
                        alt="user"
                    />
                </NavLink>

                {/* FOLLOW BUTTON */}
                <FollowButton profile={profile} />
            </div>

            {/* USERNAME */}
            <p id="profile-popover" className="text-base font-semibold leading-none mb-3 font-serif text-gray-900 dark:text-white">
                <NavLink to={`/profile/${profile.username}`} >
                    {profile.username}
                </NavLink>
            </p>

            {/* BIO */}
            <p className="mb-4 min-h-12 text-sm">
                {profile.bio}
            </p>
            
            <ul className="flex text-sm">
                {/* FOLLOWING */}
                <li className="me-2">
                    <NavLink
                        to={`/profile/${profile.username}/following`}
                        className="hover:underline"
                    >
                        <span className="font-semibold text-gray-900 dark:text-white">{profile.followingCount} </span>
                        <span>Following</span>
                    </NavLink>
                </li>
                {/* FOLLOWERS */}
                <li>
                    <NavLink
                        to={`/profile/${profile.username}/followers`}
                        className="hover:underline"
                    >
                        <span className="font-semibold text-gray-900 dark:text-white">{profile.followersCount} </span>
                        <span>Followers</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );

    return content;
};

export default ProfileCard;