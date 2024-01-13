import { useState } from "react";

import { useDeletePhotoMutation, useSetMainPhotoMutation } from "../photos/photosApiSlice";

import { Button } from 'flowbite-react';
import PhotoUploadWidget from "../photos/PhotoUploadWidget";
import PhotoCard from "../photos/PhotoCard";

const ProfilePhotos = ({ profile }) => {
    const [addPhotoMode, setAddPhotoMode] = useState(false);

    const [deletePhoto] = useDeletePhotoMutation();
    const [setMainPhoto] = useSetMainPhotoMutation();

    let content

    if (profile) {
        content = (
            <section className='container flex flex-wrap flex-col justify-between items-center mx-auto gap-2'>
                <Button
                    onClick={() => setAddPhotoMode(!addPhotoMode)}
                    size="lg"
                    className="my-3"
                >
                    {/* Alternate between Add Photo and View Photos screens */}
                    {!addPhotoMode
                        ? "Add Photo"
                        : "View Photos"}
                </Button>
                {addPhotoMode
                    ? <PhotoUploadWidget setAddPhotoMode={setAddPhotoMode} />
                    : <div className='container flex flex-wrap justify-between items-center mx-auto gap-6'>
                        {profile.photos.map(p => (
                            <PhotoCard
                                key={p.id}
                                photo={p}
                                deletePhoto={deletePhoto}
                                setMainPhoto={setMainPhoto}
                            />
                        ))}
                    </div>

                }
            </section>
        );
    }

    return content;
};

export default ProfilePhotos;