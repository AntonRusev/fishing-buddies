import { useState } from "react";
import { Button } from 'flowbite-react';

import { useUploadPhotoMutation } from "../../../features/profiles/profilesApiSlice";

import { PhotoCropper, PhotoDropzone } from "./";

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
        <article className='container flex flex-wrap flex-col justify-center items-center px-2 gap-2'>
            {/* PHOTO DROPZONE */}
            {files && files.length === 0 && (
                <div className="w-full max-w-screen-sm">
                    <h6 className="text-gray-500 text-lg font-bold tracking-wide dark:text-white">
                        Select Photo:
                    </h6>
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


                    <div className="flex flex-col items-center w-full gap-2">
                        {/* PREVIEW OF CROPPED PHOTO */}
                        <div className="img-preview" style={{ minHeight: 200, minWidth: 200, overflow: 'hidden' }} />

                        {/* BUTTONS */}
                        <Button.Group className="flex justify-stretch w-full my-2 sm:w-auto">
                            {/* UPLOAD PHOTO */}
                            <Button
                                onClick={() => handleUpload()}
                                isProcessing={isLoading || isFetching}
                                disabled={isLoading || isFetching}
                                size="xl"
                                className="flex-grow"
                            >
                                Add
                            </Button>

                            {/* REMOVE PHOTO FROM PHOTO CROPPER */}
                            <Button
                                onClick={() => setFiles([])}
                                disabled={isLoading || isFetching}
                                size="xl"
                                className="flex-grow"
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