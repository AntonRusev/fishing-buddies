import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useDeletePhotoMutation, useSetMainPhotoMutation } from "../profiles/profilesApiSlice";
import { changeImage } from "../auth/authSlice";
import { openModal, closeModal, setConfirmOptions, resetConfirmOptions } from "../modals/modalsSlice";

import ProfilePhotoListItem from "./ProfilePhotoListItem";
import ModalConfirm from "../modals/ModalConfirm";

const ProfilePhotoList = ({ profile, user, isOwner }) => {
    const [idToBeDeleted, setIdToBeDeleted] = useState('');

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [deletePhoto, { isLoading: deleteIsLoading }] = useDeletePhotoMutation();
    const [setMainPhoto, { isLoading: setMainIsLoading }] = useSetMainPhotoMutation();

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

    const content = (
        <div className='flex flex-col w-full gap-2'>
            {/* PHOTOS LIST */}
            <ul className='container flex flex-wrap justify-evenly items-center mx-auto gap-6'>
                {profile.photos.length > 0
                    ? profile.photos.map(p => (
                        <ProfilePhotoListItem
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
            </ul>

            {/* DELETE CONFIRM MODAL */}
            <ModalConfirm deleteHandler={handleDeletePhoto} />
        </div>
    );

    return content;
};

export default ProfilePhotoList;