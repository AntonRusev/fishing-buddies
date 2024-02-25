import { Cropper } from "react-cropper";
import 'cropperjs/dist/cropper.css'; // Cropper wont show without this CSS styling

const PhotoCropper = ({ imagePreview, setCropper }) => {
    const content = (
        <Cropper
            src={imagePreview}
            // style={{ height: 200, width: 'auto' }}
            initialAspectRatio={1}
            aspectRatio={1}
            preview='.img-preview'
            guides={true}
            viewMode={1}
            autoCropArea={1}
            background={false}
            onInitialized={cropper => setCropper(cropper)}
        />
    );

    return content;
};

export default PhotoCropper;