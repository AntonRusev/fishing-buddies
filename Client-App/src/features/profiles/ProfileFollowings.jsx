import { useLocation, useParams } from "react-router-dom";

import { useListFollowingsQuery } from "./profilesApiSlice";

import ProfileHeader from "./ProfileHeader";
import ProfileCard from "./ProfileCard";
import CustomSpinner from "../../components/common/CustomSpinner";

import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

const ProfileFollowings = () => {
    const { username } = useParams();
    const { pathname } = useLocation();

    // Getting the Predicate from the url(followers or following)
    const predicate = pathname.split('/').pop();

    const {
        data: followings,
        isLoading,
        isSuccess
    } = useListFollowingsQuery({ username, predicate });

    let followingsList;

    if (isLoading) {
        followingsList = (
            <CustomSpinner text={`Loading ${predicate}...`} />
        );
    } else if (isSuccess) {
        followingsList = (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-auto gap-4 mx-auto p-2">
                {followings.length > 0
                    ? followings.map(f => (
                        // LIST OF FOLLOWINGS
                        <ProfileCard profile={f} key={f.username + predicate} />
                    ))
                    : <p className="ml-auto text-gray-500 italic tracking-wide dark:text-gray-300">
                        {/* Show message that the user has no followers or is not following anyone */}
                        {predicate === "following"
                            ? `${username} is not following anyone.`
                            : predicate === "followers" && `${username} has no followers.`
                        }
                    </p>
                }
            </div>
        );
    };

    const content = (
        <article className="flex flex-col justify-center align-center items-center dark:bg-gray-900">
            {/* HEADER */}
            <ProfileHeader />

            <div className="flex flex-col w-full items-start pb-8 md:mb-8 bg-gray-50 rounded xl:max-w-screen-xl sm:w-3/4 dark:bg-gray-800">
                {/* TITLE */}
                <h4 className="m-4 ml-8 font-bold text-lg text-gray-900 font-serif tracking-wide dark:text-white">
                    {capitalizeFirstLetter(predicate)}
                </h4>

                {/* FOLLOWINGS (or Spinner) */}
                {followingsList}
            </div>
        </article>
    );

    return content;
};

export default ProfileFollowings;