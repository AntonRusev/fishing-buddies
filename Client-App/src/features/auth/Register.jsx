import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';

import { useRegisterMutation } from '../auth/authApiSlice';
import { setCredentials } from '../auth/authSlice';

import { CustomTextInput, CustomCheckbox, CustomButton } from '../../components/common/form';
import BreadcrumbNav from '../../components/common/BreadcrumbNav';

import { registerSchema } from '../../utils/schemas';

const Register = () => {
    const [register] = useRegisterMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (values, actions) => {
        const { persistAuth, rePass, ...obj } = values;
        const email = obj.email;

        // using params: email, username and password 
        await register({ ...obj })
            .unwrap()
            .then((payload) => dispatch(setCredentials({ ...payload, email, persistAuth })))
            .then(() => actions.resetForm())
            .then(() => navigate('/events'))
            .catch((error) => console.log(error));
    };

    const content = (
        <>
            <Formik
                initialValues={{ email: '', username: '', password: '', rePass: '' }}
                validationSchema={registerSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <>
                        <BreadcrumbNav />
                        <Form
                            onSubmit={handleSubmit}
                            autoComplete='off'
                            className="flex max-w-md flex-col gap-4 mx-auto"
                        >
                            {/* EMAIL */}
                            <CustomTextInput
                                placeholder="name@email.com"
                                name="email"
                                label="Your email"
                                type="email"
                            />

                            {/* USERNAME */}
                            <CustomTextInput
                                placeholder="Username"
                                name="username"
                                label="Your username"
                                type="text"
                            />

                            {/* PASSWORD */}
                            <CustomTextInput
                                placeholder="********"
                                name="password"
                                label="Your password"
                                type="password"
                            />

                            {/* RePass - REPEAT PASSWORD */}
                            <CustomTextInput
                                placeholder="********"
                                name="rePass"
                                label="Repeat password"
                                type="password"
                            />

                            {/* CHECKBOX */}
                            <CustomCheckbox
                                name="persistAuth"
                                label="Remember me"
                            />

                            {/* SUBMIT */}
                            <CustomButton
                                isValid={isValid}
                                dirty={dirty}
                                isSubmitting={isSubmitting}
                                value='Register'
                            />
                        </Form>
                    </>
                )}
            </Formik>
        </>
    );

    return content;
};

export default Register;