import { useParams } from "react-router-dom";

import { useGetProfileQuery } from "./profilesApiSlice";

import ProfileNavBar from "./ProfileNavBar";

import { Spinner } from 'flowbite-react';

const ProfilePage = () => {
    const { username } = useParams();

    const {
        data: profile,
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProfileQuery(username);

    let content;

    if (isFetching || isLoading) {
        content = (<Spinner aria-label="Extra large spinner example" size="xl" />);
    } else if (isSuccess && profile) {
        content = (<ProfileNavBar profile={profile} />);
    } else if (isError) {
        content = (<p>{JSON.stringify(error)}</p>);
    };

    return content;
};

export default ProfilePage;