import { useParams } from "react-router-dom";

import { useGetProfileQuery } from "./profilesApiSlice";

import { Spinner } from 'flowbite-react';
import ProfileAbout from "./ProfileAbout";

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
        content = (<ProfileAbout profile={profile} />);
    };

    return content;
};

export default ProfilePage;