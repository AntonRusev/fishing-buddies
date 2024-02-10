import { useSelector } from "react-redux";

import { selectCurrentUser } from "../auth/authSlice";
import { useUpdateFollowingMutation } from "./profilesApiSlice";

import { Button } from 'flowbite-react';
import { useParams } from "react-router-dom";

const FollowButton = ({ profile }) => {
    const { id } = useParams();
    const [updateFollowing, { isLoading, isFetching }] = useUpdateFollowingMutation();

    const user = useSelector(selectCurrentUser);

    if (!user || !profile.username || user === profile.username) {
        // User can not follow or unfollow themselves;
        return;
    };

    const handleFollow = () => {
        updateFollowing({ username: profile.username, id });
    };

    const content = (
        <Button
            onClick={handleFollow}
            isProcessing={isLoading || isFetching}
            color="gray"
            disabled={isLoading || isFetching}
        >
            {profile.following
                ? "Unfollow"
                : "Follow"
            }
        </Button>
    );

    return content;
};

export default FollowButton;