import { useState } from "react";

import { useUploadPhotoMutation } from "../../../features/profiles/profilesApiSlice";

import { PhotoCropper, PhotoDropzone } from "./";
import { Button } from 'flowbite-react';

const PhotoUploadWidget = ({ setAddPhotoMode, user }) => {
    const [files, setFiles] = useState([]);
    const [cropper, setCropper] = useState();

    const [uploadPhoto, { isLoading, isFetching }] = useUploadPhotoMutation();

    function handleUpload() {
        try {
            if (cropper) {
                cropper.getCroppedCanvas().toBlob(async (blob) => {
                    await uploadPhoto({ file: blob, user })
                        .then(response => console.log(response))
                        .then(data => setAddPhotoMode(false)) // Close the PhotoUploadWidget upon upload
                });
            };
        } catch (error) {
            console.log(error);
        };
    };

    const content = (
        <article className='container flex flex-wrap flex-col justify-center items-center mx-auto gap-2'>
            {/* PHOTO DROPZONE */}
            {files && files.length === 0 && (
                <div>
                    <PhotoDropzone
                        setFiles={setFiles}
                    />
                </div>
            )}

            {files && files.length > 0 && (
                <div className="flex flex-col gap-2">
                    {/* PHOTO CROPPER */}
                    <div>
                        <PhotoCropper
                            setCropper={setCropper}
                            imagePreview={files[0].preview}
                        />
                    </div>


                    <div className="flex flex-col items-center gap-2">
                        {/* PREVIEW OF CROPPED PHOTO */}
                        <div className="img-preview" style={{ minHeight: 200, minWidth: 200, overflow: 'hidden' }} />
                        <Button.Group>

                            {/* UPLOAD PHOTO */}
                            <Button
                                onClick={() => handleUpload()}
                                isProcessing={isLoading || isFetching}
                                disabled={isLoading || isFetching}
                            >
                                Add
                            </Button>

                            {/* REMOVE PHOTO FROM PHOTO CROPPER */}
                            <Button
                                onClick={() => setFiles([])}
                                disabled={isLoading || isFetching}
                            >
                                Reset
                            </Button>

                        </Button.Group>
                    </div>
                </div>
            )}
        </article>
    );

    return content;
};

export default PhotoUploadWidget;