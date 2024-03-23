import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Spinner } from 'flowbite-react';

import { selectUser } from "../auth/authSlice";

import { useGetProfileQuery } from "./profilesApiSlice";
import ProfileNavigation from "./ProfileNavigation";

let ProfileHeader = () => {
    const { username } = useParams();

    const user = useSelector(selectUser);

    const {
        data: profile,
        isFetching,
        isLoading,
        isSuccess
    } = useGetProfileQuery(username);

    let profileHeaderView;

    if (isFetching || isLoading) {
        profileHeaderView = (
            <div className="flex items-center justify-start w-full px-24 min-h-96 sm:min-h-36">
                <Spinner size="xl" />
            </div>
        );
    } else if (isSuccess) {
        profileHeaderView = (
            <>
                <div className="sm:flex-shrink-0 md:flex-shrink-0">
                    {/* USER'S IMAGE */}
                    <img
                        className="object-cover inline-block min-h-full max-h-full w-full sm:w-36 md:w-36 lg:w-36"
                        // If user is owner of the profile, set image from local state instead of response
                        src={(profile.username === user.username ? user.image : profile.image) || "/user.png"}
                        alt="avatar"
                    />
                    {/* FOLLOWING RIBBON */}
                    {profile.following &&
                        <div className="absolute right-0 top-0 h-16 w-16">
                            <div className="absolute transform rotate-45 bg-green-600 text-center text-white font-semibold py-1 right-[-35px] top-[32px] w-[170px]">
                                Following
                            </div>
                        </div>
                    }
                </div>
                <div className="w-full ml-3 md:mt-0 md:ml-6 sm:ml-3">
                    {/* USERNAME */}
                    <h3 className="flex mt-2 mb-1 tracking-wider font-serif text-4xl text-600 font-bold font-serif text-gray-700 dark:text-white">
                        {profile.username}'s Profile
                    </h3>
                </div>
            </>
        );
    };

    let content;
    
    if (profile) {
        content = (
            <div className="flex flex-col items-center w-full m-4">
                <div className="relative overflow-hidden xl:max-w-screen-xl sm:w-3/4 items-center mt-4 rounded-t sm:flex md:flex px-5 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                    {profileHeaderView}
                </div>

                {/* PROFILE NAVIGATION */}
                <ProfileNavigation username={profile.username} />
            </div>
        );
    } else {
        content = (
            <div className="flex flex-col items-center w-full m-4">No profile to be shown.</div>
        );
    };

    return content;
};

ProfileHeader = React.memo(ProfileHeader);

export default ProfileHeader;