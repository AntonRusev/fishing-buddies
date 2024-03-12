import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from 'flowbite-react';

import { useGetProfileQuery } from "../profiles/profilesApiSlice";
import { selectUser } from "../auth/authSlice";

import ProfileHeader from "./ProfileHeader";
import { PhotoUploadWidget } from "../../components/common/photoUpload";
import ProfilePhotoList from "./ProfilePhotoList";
import CustomSpinner from "../../components/common/CustomSpinner";

const ProfilePhotos = () => {
    const [addPhotoMode, setAddPhotoMode] = useState(false);

    const { username } = useParams();

    const user = useSelector(selectUser);
    const {
        data: profile,
        isFetching,
        isLoading: profileIsLoading,
        isSuccess
    } = useGetProfileQuery(username);

    // Check if the User is the owner of the viewed Profile
    let isOwner = false;

    if (profile) {
        isOwner = user.username === profile.username;
    };

    let photosView;

    if (profileIsLoading || isFetching) {
        photosView = (
            <CustomSpinner text={`Loading ${username}'s photos...`} />
        );
    } else if (isSuccess && profile) {
        photosView = (
            <ProfilePhotoList profile={profile} user={user.username} isOwner={isOwner} />
        );
    };

    let content = (
        <article className="flex flex-col items-center dark:bg-gray-900">
            <ProfileHeader />

            <div className='flex flex-col w-full gap-2 bg-gray-100 p-2 pb-8 md:mb-8 rounded xl:max-w-screen-xl sm:items-start sm:w-3/4 dark:bg-gray-800'>
                {/* If the user is viewing his own profile */}
                {/* Trigger button to alternate between Add Photo and View Photos modes*/}
                {
                    isOwner &&
                    <Button
                        onClick={() => setAddPhotoMode(!addPhotoMode)}
                        size="lg"
                        className="my-3 mx-2"
                    >
                        {!addPhotoMode
                            ? "Add Photo"
                            : "Cancel"
                        }
                    </Button>
                }

                {/* UPLOAD PHOTO or PHOTOS LIST view */}
                {
                    addPhotoMode
                        ? <PhotoUploadWidget setAddPhotoMode={setAddPhotoMode} user={user} />
                        : photosView
                }
            </div>
        </article>
    );
    return content;
};

export default ProfilePhotos;