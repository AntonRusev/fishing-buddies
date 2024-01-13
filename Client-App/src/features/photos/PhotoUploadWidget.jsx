import { useState } from "react";

import { useUploadPhotoMutation } from "./photosApiSlice";

import { PhotoCropper, PhotoDropzone } from "../../components/common/photoUpload";
import { Button } from 'flowbite-react';

const PhotoUploadWidget = ({ setAddPhotoMode }) => {
    const [files, setFiles] = useState([]);
    const [cropper, setCropper] = useState();

    const [uploadPhoto] = useUploadPhotoMutation();

    function handleUpload() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob));
            // Close the PhotoUploadWidget upon upload
            setAddPhotoMode(false);
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
                            >
                                Add
                            </Button>

                            {/* REMOVE PHOTO FROM PHOTO CROPPER */}
                            <Button
                                onClick={() => setFiles([])}
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