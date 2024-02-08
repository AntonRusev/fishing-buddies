import { Button, Card } from 'flowbite-react';
import { useState } from 'react';

import { HiTrash, HiBadgeCheck } from 'react-icons/hi';

const ProfilePhotoItem = ({ photo, handleOpenModal, handleSetMainPhoto, deleteIsLoading, setMainIsLoading, isOwner }) => {
    // TODO Find another way to show Spinner only on the clicked button
    const [targetPhoto, setTargetPhoto] = useState('');

    const content = (
        <li>
            <Card
                className="max-w-sm items-center "
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                imgSrc={photo.url}
            >
                {!photo.isMain && isOwner
                    && <Button.Group outline >
                        <Button
                            onClick={() => (
                                setTargetPhoto(photo.id),
                                handleSetMainPhoto(photo.id, photo.url)
                            )}
                            gradientMonochrome="success"
                            isProcessing={setMainIsLoading && photo.id == targetPhoto}
                            disabled={setMainIsLoading || deleteIsLoading}
                        >
                            {/* If isLoading hide the icon and show Spinner instead */}
                            {photo.id != targetPhoto && <HiBadgeCheck className="mr-3 h-4 w-4" />}
                            Set Main
                        </Button>
                        <Button
                            onClick={() => (
                                setTargetPhoto(photo.id),
                                handleOpenModal(photo.id)
                            )}
                            gradientMonochrome="failure"
                            isProcessing={deleteIsLoading && photo.id == targetPhoto}
                            disabled={setMainIsLoading || deleteIsLoading}
                        >
                            {photo.id != targetPhoto && <HiTrash className="mr-3 h-4 w-4" />}
                            {/* &nbsp; => empty space */}
                            Delete &nbsp; &nbsp;
                        </Button>
                    </Button.Group>}
            </Card>
        </li>
    );

    return content;
};

export default ProfilePhotoItem;