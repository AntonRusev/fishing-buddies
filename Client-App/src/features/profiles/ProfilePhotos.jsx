import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Button, Spinner } from 'flowbite-react';

import { useDeletePhotoMutation, useGetProfileQuery, useSetMainPhotoMutation } from "../profiles/profilesApiSlice";
import { changeImage, selectCurrentUser } from "../auth/authSlice";
import { openModal, closeModal, setConfirmOptions, resetConfirmOptions } from "../modals/modalsSlice";

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
            <>
                <section className='container flex flex-wrap flex-col justify-between items-center mx-auto gap-2'>
                    {/* If the user is viewing his own profile */}
                    {/* Trigger button to alternate between Add Photo and View Photos views*/}
                    {isOwner &&
                        <Button
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                            size="lg"
                            className="my-3"
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
                        : <ul className='container flex flex-wrap justify-between items-center mx-auto gap-6'>
                            {profile.photos.map(p => (
                                <ProfilePhotoItem
                                    key={p.id}
                                    photo={p}
                                    handleOpenModal={handleOpenModal}
                                    handleSetMainPhoto={handleSetMainPhoto}
                                    deleteIsLoading={deleteIsLoading}
                                    setMainIsLoading={setMainIsLoading}
                                    isOwner={isOwner}
                                />
                            ))}
                        </ul>
                    }

                    {/* BACK BUTTON */}
                    <NavLink to={`/profile/${profile.username}`} >
                        <Button outline>
                            <HiOutlineArrowLeft className="h-6 w-6" />
                        </Button>
                    </NavLink>

                    {/* DELETE CONFIRM MODAL */}
                    <ModalConfirm deleteHandler={handleDeletePhoto} />
                </section >
            </>
        );
    };

    return content;
};

export default ProfilePhotos;