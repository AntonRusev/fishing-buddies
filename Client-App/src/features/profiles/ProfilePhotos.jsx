import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useDeletePhotoMutation, useSetMainPhotoMutation } from "../profiles/profilesApiSlice";
import { changeImage, selectCurrentUser } from "../auth/authSlice";

import { PhotoUploadWidget } from "../../components/common/photoUpload";
import ProfilePhotoItem from "./ProfilePhotoItem";
import { Button } from 'flowbite-react';

const ProfilePhotos = ({ profile }) => {
    const [addPhotoMode, setAddPhotoMode] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(selectCurrentUser);
    const [deletePhoto, { isLoading: deleteIsLoading }] = useDeletePhotoMutation();
    const [setMainPhoto, { isLoading: setMainIsLoading }] = useSetMainPhotoMutation();

    // Check if the user is viewing own profile or someone else's
    const isOwner = user === profile.username;

    const handleSetMainPhoto = (id, url) => {
        // Change the IsMain in the database
        setMainPhoto(id);
        // Change user image in local state
        dispatch(changeImage(url));

        navigate(`/profiles/${profile.username}`);
    };

    let content;

    if (profile) {
        content = (
            <section className='container flex flex-wrap flex-col justify-between items-center mx-auto gap-2'>
                {isOwner
                    ? <Button
                        onClick={() => setAddPhotoMode(!addPhotoMode)}
                        size="lg"
                        className="my-3"
                    >
                        {/* Alternate between Add Photo and View Photos screens */}
                        {!addPhotoMode
                            ? "Add Photo"
                            : "Cancel"}
                    </Button>
                    : ''
                }

                {addPhotoMode
                    ? <PhotoUploadWidget setAddPhotoMode={setAddPhotoMode} />
                    : <ul className='container flex flex-wrap justify-between items-center mx-auto gap-6'>
                        {profile.photos.map(p => (
                            <ProfilePhotoItem
                                key={p.id}
                                photo={p}
                                deletePhoto={deletePhoto}
                                handleSetMainPhoto={handleSetMainPhoto}
                                deleteIsLoading={deleteIsLoading}
                                setMainIsLoading={setMainIsLoading}
                                isOwner={isOwner}
                            />
                        ))}
                    </ul>
                }
            </section>
        );
    };

    return content;
};

export default ProfilePhotos;