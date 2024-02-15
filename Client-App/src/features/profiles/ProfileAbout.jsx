import { NavLink } from 'react-router-dom';
import FollowButton from './FollowButton';
import { Button } from 'flowbite-react';
import { useState } from 'react';
import ProfileEdit from './ProfileEdit';

const ProfileAbout = ({ profile }) => {
    const [editMode, setEditMode] = useState(false);

    let content;

    if (profile && !editMode) {
        content = (
            <section className="bg-white dark:bg-gray-900">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h2 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                            {profile.username}'s Profile
                        </h2>
                        <div className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                            <FollowButton profile={profile} />
                            <div>
                                {profile.bio}
                            </div>
                            <NavLink
                                to={`/profile/${profile.username}/followers`}
                                className="hover:underline"
                            >
                                <span>Followers: {profile.followersCount}</span>
                            </NavLink>
                            <span> / </span>
                            <NavLink
                                to={`/profile/${profile.username}/following`}
                                className="hover:underline"
                            >
                                <span>Following: {profile.followingCount}</span>
                            </NavLink>
                        </div>
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        {/* Profile Photo/Image */}
                        <img
                            src={profile.image || "/user.png"} 
                            alt="User Image"
                        />
                    </div>
                    <NavLink
                        to={`/profile/${profile.username}/photos`}
                    >
                        View Photos
                    </NavLink>
                    <NavLink
                        to={`/profile/${profile.username}/events`}
                    >
                        {profile.username}'s Events
                    </NavLink>

                    {/* EDIT Button */}
                    <Button
                        onClick={() => setEditMode(true)}
                    >
                        Edit Profile
                    </Button>
                </div>
            </section>
        );
    } else if (editMode) {
        content = (<ProfileEdit setEditMode={setEditMode} />);
    }

    return content;
};

export default ProfileAbout;