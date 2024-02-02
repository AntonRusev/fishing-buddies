import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';

import { useLoginMutation } from '../auth/authApiSlice';
import { setCredentials } from '../auth/authSlice';

import { CustomTextInput, CustomCheckbox, CustomButton } from '../../components/common/form';
import BreadcrumbNav from '../../components/common/BreadcrumbNav';

import { loginSchema } from '../../utils/schemas';

const Login = () => {
    const [login] = useLoginMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // TODO Create a custom useHandleAuth hook for both Login and Register
    const handleSubmit = async (values, actions) => {
            const { persistAuth, ...obj } = values;
            const email = obj.email;

            // using params: email and password 
            await login({ ...obj })
                .unwrap()
                .then((payload) => dispatch(setCredentials({ ...payload, email, persistAuth })))
                .then(() => actions.resetForm())
                .then(() => navigate('/events'))
                .catch((error) => console.log(error));
    };

    const content = (
        <>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <>
                        <BreadcrumbNav />
                        <Form
                            onSubmit={handleSubmit}
                            autoComplete='off'
                            className="flex max-w-md flex-col gap-4 mx-auto dark:bg-gray-900"
                        >
                            {/* EMAIL */}
                            <CustomTextInput
                                placeholder="name@email.com"
                                name="email"
                                label="Your email"
                                type="email"
                            />

                            {/* PASSWORD */}
                            <CustomTextInput
                                placeholder="********"
                                name="password"
                                label="Your password"
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
                                value='Login'
                            />
                        </Form>
                    </>
                )}
            </Formik>
        </>
    );

    return content;
};

export default Login;