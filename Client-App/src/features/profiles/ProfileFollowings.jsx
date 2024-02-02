import { useLocation, useParams, NavLink } from "react-router-dom";

import { useListFollowingsQuery } from "./profilesApiSlice";

import ProfileCard from "./ProfileCard";
import { Button, Spinner } from 'flowbite-react';
import { HiOutlineArrowLeft } from 'react-icons/hi';

const ProfileFollowings = () => {
    const { username } = useParams();
    const { pathname } = useLocation();

    const predicate = pathname.split('/').pop();

    // if (predicate !== "followers" && predicate !== "following") {
    //     return;
    // };

    const {
        data: followings,
        isLoading,
        isSuccess
    } = useListFollowingsQuery({ username, predicate });

    let content;

    if (isLoading) {
        content = (<Spinner aria-label="Extra large spinner example" size="xl" />)
    } else if (isSuccess) {
        content = (
            <article>
                <h4>{username}'s {predicate}</h4>
                {followings.map(f => (
                    <ProfileCard profile={f} key={f.username + predicate} />
                ))}
                <NavLink to={`/profile/${username}`} >
                    <Button outline>
                        <HiOutlineArrowLeft className="h-6 w-6" />
                    </Button>
                </NavLink>
            </article>
        );
    };

    return content;
};

export default ProfileFollowings;