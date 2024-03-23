import { useParams } from "react-router-dom";

import { useGetProfileQuery } from "./profilesApiSlice";

import ProfileAbout from "./ProfileAbout";
import ProfileHeader from "./ProfileHeader";
import CustomSpinner from "../../components/common/CustomSpinner";

const ProfilePage = () => {
    const { username } = useParams();

    const {
        data: profile,
        isFetching,
        isLoading,
        isSuccess
    } = useGetProfileQuery(username);

    let profileView;

    if (isFetching || isLoading) {
        profileView = (
            <div className="flex w-full xl:max-w-screen-xl py-8 mx-2 bg-gray-50 rounded dark:bg-gray-800 sm:w-3/4">
                <CustomSpinner />
            </div>
        );
    } else if (isSuccess && profile) {
        profileView = (
            <ProfileAbout profile={profile} />
        );
    };

    const content = (
        <div
            className="flex flex-col justify-center align-center items-center dark:bg-gray-900"
            data-testid="profile-page"
        >
            <ProfileHeader />
            {profileView}
        </div>
    );

    return content;
};

export default ProfilePage;