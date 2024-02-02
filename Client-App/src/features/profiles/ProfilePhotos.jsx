import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { useDeletePhotoMutation, useGetProfileQuery, useSetMainPhotoMutation } from "../profiles/profilesApiSlice";
import { changeImage, selectCurrentUser } from "../auth/authSlice";

import { PhotoUploadWidget } from "../../components/common/photoUpload";
import ProfilePhotoItem from "./ProfilePhotoItem";
import { Button, Spinner } from 'flowbite-react';
import { HiOutlineArrowLeft } from 'react-icons/hi';

const ProfilePhotos = () => {
    const { username } = useParams();
    const [addPhotoMode, setAddPhotoMode] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        data: profile,
        isFetching,
        isLoading: profileIsLoading,
        isSuccess
    } = useGetProfileQuery(username);

    const user = useSelector(selectCurrentUser);
    const [deletePhoto, { isLoading: deleteIsLoading }] = useDeletePhotoMutation();
    const [setMainPhoto, { isLoading: setMainIsLoading }] = useSetMainPhotoMutation();

    // Check if the user is viewing own profile or someone else's
    let isOwner = false;

    if (profile) {
        isOwner = user === profile.username;
    };

    const handleSetMainPhoto = (id, url) => {
        // Change the IsMain in the database
        setMainPhoto(id);
        // Change user image in local state
        dispatch(changeImage(url));

        navigate(`/profile/${profile.username}/photos`);
    };

    let content;

    if (profileIsLoading || isFetching) {
        content = (<Spinner aria-label="Extra large spinner example" size="xl" />)
    } else if (isSuccess && profile) {
        content = (
            <>
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

                    <NavLink to={`/profile/${profile.username}`} >
                        <Button outline>
                            <HiOutlineArrowLeft className="h-6 w-6" />
                        </Button>
                    </NavLink>
                </section >
            </>
        );
    }

    return content;
};

export default ProfilePhotos;