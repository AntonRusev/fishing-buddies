import { Button, Card } from 'flowbite-react';

import { HiTrash, HiBadgeCheck } from 'react-icons/hi';

const ProfilePhotoItem = ({ photo, deletePhoto, handleSetMainPhoto }) => {

    const content = (
        <Card
            className="max-w-sm items-center "
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc={photo.url}
        >
            <Button.Group outline >
                <Button
                    onClick={() => handleSetMainPhoto(photo.id, photo.url)}
                    gradientMonochrome="success"
                >
                    <HiBadgeCheck className="mr-3 h-4 w-4" />
                    Set Main
                </Button>
                <Button
                    onClick={() => deletePhoto(photo.id)}
                    gradientMonochrome="failure"
                >
                    <HiTrash className="mr-3 h-4 w-4" />
                    {/* &nbsp; => empty space */}
                    Delete &nbsp; &nbsp;
                </Button>
            </Button.Group>
        </Card>
    );

    return content;
};

export default ProfilePhotoItem;