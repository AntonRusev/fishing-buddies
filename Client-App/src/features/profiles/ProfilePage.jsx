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

    let content;

    if (isFetching || isLoading) {
        content = (
            <div className="flex flex-col justify-center align-center mt-16 items-center dark:bg-gray-900 min-h-96">
                <div className="flex w-full xl:max-w-screen-xl mx-2 px-12 sm:w-3/4 dark:bg-gray-900">
                    <CustomSpinner text={"Loading profile page..."} />
                </div>
            </div>
        );
    } else if (isSuccess && profile) {
        content = (
            <div
                className="flex flex-col justify-center align-center items-center dark:bg-gray-900"
                data-testid="profile-page"
            >
                <ProfileHeader />
                <ProfileAbout profile={profile} />
            </div>

        );
    };

    return content;
};

export default ProfilePage;