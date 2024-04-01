import React, { useState } from "react";
import { Button } from 'flowbite-react';

import { HiTrash, HiBadgeCheck } from 'react-icons/hi';

let ProfilePhotoListItem = ({ photo, handleOpenModal, handleSetMainPhoto, deleteIsLoading, setMainIsLoading, isOwner }) => {
    const [targetPhoto, setTargetPhoto] = useState('');

    // Reset the target photo in order to show only one element with isProcessing spinner at a time
    const resetTargetPhoto = () => {
        setTimeout(() => {
            setTargetPhoto('');
        }, "2000");
    };

    const content = (
        <li>
            <div className="relative w-80 h-auto rounded overflow-none">
                {/* IMAGE */}
                <img
                    src={photo.url || "/user.png"}
                    className='w-full rounded text-gray-600 text-center dark:text-gray-200'
                    alt="user picture"
                />
                
                {/* If User is Owner */}
                {!photo.isMain && isOwner
                    && <div className="block">
                        {/* SET PHOTO AS MAIN BUTTON */}
                        <Button
                            id={photo.id}
                            onClick={() => (
                                setTargetPhoto(photo.id),
                                handleSetMainPhoto(photo.id, photo.url),
                                resetTargetPhoto()
                            )}
                            gradientMonochrome="success"
                            isProcessing={setMainIsLoading && photo.id === targetPhoto}
                            disabled={setMainIsLoading || deleteIsLoading}
                            className='absolute bottom-1 left-1 rounded-lg shadow-2xl'
                            data-testid="profile-photo-button-setmain"
                        >
                            <HiBadgeCheck className="h-6 w-6" />
                        </Button>

                        {/* DELETE BUTTON */}
                        <Button
                            onClick={() => (
                                setTargetPhoto(photo.id),
                                handleOpenModal(photo.id),
                                resetTargetPhoto()
                            )}
                            gradientMonochrome="failure"
                            isProcessing={deleteIsLoading && photo.id === targetPhoto}
                            disabled={setMainIsLoading || deleteIsLoading}
                            className='absolute bottom-1 right-1 rounded-lg shadow-2xl'
                            data-testid="profile-photo-button-delete"
                        >
                            <HiTrash className="h-6 w-6" />
                        </Button>
                    </div>
                }
            </div>
        </li>
    );

    return content;
};

ProfilePhotoListItem = React.memo(ProfilePhotoListItem);

export default ProfilePhotoListItem;