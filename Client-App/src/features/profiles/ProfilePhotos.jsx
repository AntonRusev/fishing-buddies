import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { useDeletePhotoMutation, useGetProfileQuery, useSetMainPhotoMutation } from "../profiles/profilesApiSlice";
import { changeImage, selectCurrentUser } from "../auth/authSlice";

import { PhotoUploadWidget } from "../../components/common/photoUpload";
import ProfilePhotoItem from "./ProfilePhotoItem";
import { Button, Spinner } from 'flowbite-react';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import DeleteModal from "../../components/common/modals/deleteModal";

const ProfilePhotos = () => {
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [idToBeDeleted, setIdToBeDeleted] = useState('');

    const { username } = useParams();

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

    const handleSetMainPhoto = async (id, url) => {
        if (id && url && user) {
            await setMainPhoto({ photoId: id, user }) // Change the IsMain in the database
                .unwrap()
                .then(dispatch(changeImage(url))) // Change user image in local state
                .then(navigate(`/profile/${profile.username}/photos`))
        };
    };

    const handleDeletePhoto = async () => {
        if (idToBeDeleted && user) {
            await deletePhoto({ photoId: idToBeDeleted, user })
                .unwrap()
                .then(setOpenDeleteModal(false));
        };
    };

    const handleOpenModal = (id) => {
        setOpenDeleteModal(true);
        setIdToBeDeleted(id);
    };

    let content;

    if (profileIsLoading || isFetching) {
        content = (<Spinner aria-label="Extra large spinner example" size="xl" />)
    } else if (isSuccess && profile) {
        content = (
            <>
                <section className='container flex flex-wrap flex-col justify-between items-center mx-auto gap-2'>
                    {/* If the user is viewing his own profile */}
                    {/* Trigger button to alternate between Add Photo and View Photos views*/}
                    {isOwner

                        ? <Button
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                            size="lg"
                            className="my-3"
                        >

                            {!addPhotoMode
                                ? "Add Photo"
                                : "Cancel"}
                        </Button>
                        : ''
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

                    {/* DELETE MODAL */}
                    {openDeleteModal &&
                        <DeleteModal
                            trigger={openDeleteModal}
                            closeModal={setOpenDeleteModal}
                            deleteHandler={handleDeletePhoto}
                            textString={"photo"}
                        />
                    }
                </section >
            </>
        );
    }

    return content;
};

export default ProfilePhotos;