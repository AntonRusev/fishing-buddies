import { useSelector } from 'react-redux';
import { Form, Formik } from 'formik';

import { useEditProfileMutation } from './profilesApiSlice';
import { selectCurrentUser } from '../auth/authSlice';

import { CustomButton, CustomTextArea } from '../../components/common/form'
import { userBioSchema } from '../../utils/schemas';
import { Button } from 'flowbite-react';

const ProfileEdit = ({ setEditMode }) => {
    const user = useSelector(selectCurrentUser);

    const [editProfile] = useEditProfileMutation();

    const handleSubmit = async (values, actions) => {

        // using params: bio
        await editProfile({ bio: { ...values }, user })
            .unwrap()
            .then(() => actions.resetForm())
            // .then(() => navigate(`/profiles/${user}`))
            .then(() => setEditMode(false))
            .catch((error) => console.log(error));
    };

    const content = (
        <>
            <Formik
                initialValues={{ bio: '' }}
                validationSchema={userBioSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <>
                        <Form
                            onSubmit={handleSubmit}
                            autoComplete='off'
                            className="flex max-w-md flex-col gap-4 mx-auto dark:bg-gray-900"
                        >
                            {/* Edit Bio TEXT AREA */}
                            <CustomTextArea
                                placeholder="Edit your Bio"
                                name="bio"
                                label="Bio:"
                            />
                            {/* SUBMIT */}
                            <CustomButton
                                isValid={isValid}
                                dirty={dirty}
                                isSubmitting={isSubmitting}
                                value={"Save"}
                            />
                            {/* CANCEL BUTTON */}
                            <Button
                                onClick={() => setEditMode(false)}
                            >
                                Cancel
                            </Button>
                        </Form>
                    </>
                )}
            </Formik>
        </>
    );

    return content;
};

export default ProfileEdit;