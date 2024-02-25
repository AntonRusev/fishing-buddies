import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Button, Spinner } from 'flowbite-react';

import { useDeletePhotoMutation, useGetProfileQuery, useSetMainPhotoMutation } from "../profiles/profilesApiSlice";
import { changeImage, selectCurrentUser } from "../auth/authSlice";
import { openModal, closeModal, setConfirmOptions, resetConfirmOptions } from "../modals/modalsSlice";

import ProfileHeader from "./ProfileHeader";
import { PhotoUploadWidget } from "../../components/common/photoUpload";
import ProfilePhotoItem from "./ProfilePhotoItem";
import ModalConfirm from "../modals/ModalConfirm";

import { HiOutlineArrowLeft } from 'react-icons/hi';

const ProfilePhotos = () => {
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [idToBeDeleted, setIdToBeDeleted] = useState('');

    const { username } = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const {
        data: profile,
        isFetching,
        isLoading: profileIsLoading,
        isSuccess
    } = useGetProfileQuery(username);
    const [deletePhoto, { isLoading: deleteIsLoading }] = useDeletePhotoMutation();
    const [setMainPhoto, { isLoading: setMainIsLoading }] = useSetMainPhotoMutation();

    // Check if the user is viewing own profile or someone else's
    let isOwner = false;

    if (profile) {
        isOwner = user === profile.username;
    };

    // SET PHOTO AS MAIN
    const handleSetMainPhoto = async (id, url) => {
        if (id && url && user) {
            await setMainPhoto({ photoId: id, user, url }) // Change the IsMain in the database
                .unwrap()
                .then(dispatch(changeImage(url))) // Change user image in local state
                .then(navigate(`/profile/${profile.username}/photos`));
        };
    };

    // DELETE PHOTO
    const handleDeletePhoto = async () => {
        if (idToBeDeleted && user) {
            await deletePhoto({ photoId: idToBeDeleted, user })
                .unwrap()
                .then(dispatch(resetConfirmOptions()))
                .then(dispatch(closeModal()));
        };
    };

    // OPEN CONFIRMATION MODAL
    const handleOpenModal = (id) => {
        dispatch(openModal());
        dispatch(setConfirmOptions("photo"));
        setIdToBeDeleted(id);
    };

    let content;

    if (profileIsLoading || isFetching) {
        content = (<Spinner aria-label="Extra large spinner example" size="xl" />);
    } else if (isSuccess && profile) {
        content = (
            <article className="flex flex-col items-center">
                <ProfileHeader />
                <div className='flex flex-col w-full gap-2 bg-gray-100 p-2 rounded xl:max-w-screen-xl sm:items-start sm:w-3/4 dark:bg-gray-800'>
                    {/* If the user is viewing his own profile */}
                    {/* Trigger button to alternate between Add Photo and View Photos views*/}
                    {isOwner &&
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
                    {addPhotoMode
                        ? <PhotoUploadWidget setAddPhotoMode={setAddPhotoMode} user={user} />
                        : <ul className='container flex flex-wrap justify-evenly items-center mx-auto gap-6'>
                            {profile.photos.length > 0
                                ? profile.photos.map(p => (
                                    <ProfilePhotoItem
                                        key={p.id}
                                        photo={p}
                                        handleOpenModal={handleOpenModal}
                                        handleSetMainPhoto={handleSetMainPhoto}
                                        deleteIsLoading={deleteIsLoading}
                                        setMainIsLoading={setMainIsLoading}
                                        isOwner={isOwner}
                                    />
                                ))
                                : <p className="ml-4 text-gray-500 italic tracking-wide dark:text-gray-300">
                                    There are no photos to be shown.
                                </p>
                            }
                            { }
                        </ul>
                    }

                    {/* DELETE CONFIRM MODAL */}
                    <ModalConfirm deleteHandler={handleDeletePhoto} />
                </div>
            </article>
        );
    };

    return content;
};

export default ProfilePhotos;