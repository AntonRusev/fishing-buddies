import { useSelector } from 'react-redux';
import { Form, Formik } from 'formik';

import { useEditProfileMutation } from './profilesApiSlice';
import { selectCurrentUsername } from '../auth/authSlice';

import { CustomButton, CustomTextArea } from '../../components/common/form'
import { userBioSchema } from '../../utils/schemas';
import { Button } from 'flowbite-react';

const ProfileEdit = ({ setEditMode }) => {
    const user = useSelector(selectCurrentUsername);

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
        <div className="flex flex-col justify-center align-center items-center w-full">
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
                            className="flex w-full max-w-lg flex-col gap-4 p-2 dark:bg-gray-900"
                        >
                            {/* Edit Bio TEXT AREA */}
                            <CustomTextArea
                                placeholder="Edit your Bio"
                                name="bio"
                                label="Bio:"
                            />

                            {/* BUTTONS */}
                            <div className='flex gap-4 justify-stretch'>
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
                                    className="flex-grow"
                                >
                                    Cancel
                                </Button>
                            </div>


                        </Form>
                    </>
                )}
            </Formik>
        </div>
    );

    return content;
};

export default ProfileEdit;