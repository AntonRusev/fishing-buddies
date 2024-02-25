import { useParams } from "react-router-dom";
import { Spinner } from 'flowbite-react';

import { useGetProfileQuery } from "./profilesApiSlice";

import ProfileAbout from "./ProfileAbout";
import ProfileHeader from "./ProfileHeader";

const ProfilePage = () => {
    const { username } = useParams();

    const {
        data: profile,
        isFetching,
        isLoading,
        isSuccess
    } = useGetProfileQuery(username);

    let content;

    if (isFetching || isLoading) {
        content = (<Spinner aria-label="Extra large spinner example" size="xl" />);
    } else if (isSuccess && profile) {
        content = (
            <div className="flex flex-col justify-center align-center items-center">
                <ProfileHeader />
                <ProfileAbout profile={profile} />
            </div>
        );
    };

    return content;
};

export default ProfilePage;