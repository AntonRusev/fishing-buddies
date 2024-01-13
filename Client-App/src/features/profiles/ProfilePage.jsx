import { useParams } from "react-router-dom";

import { useGetProfileQuery } from "./profilesApiSlice";

import ProfileNavBar from "./ProfileNavBar";

const ProfilePage = () => {
    const { username } = useParams();

    const { data: profile } = useGetProfileQuery(username);

    let content;

    if (profile) {
        content = (
            <>
                <ProfileNavBar profile={profile} />
            </>
        );
    } else {
        content = (
            <p>Could not find such user.</p>
        );
    };

    return content;
};

export default ProfilePage;