import { useNavigate, NavLink } from 'react-router-dom';
import { Form, Formik } from 'formik';

import { useRegisterMutation } from '../auth/authApiSlice';

import { CustomTextInput, CustomButton } from '../../components/common/form';
import FbLogin from './FbLogin';

import { registerSchema } from '../../utils/schemas';

const Register = () => {
    const [register] = useRegisterMutation();

    const navigate = useNavigate();

    const handleSubmit = async (values, actions) => {
        const { rePass, ...obj } = values;
        const email = obj.email;

        // using params: email, username and password 
        await register({ ...obj })
            .unwrap()
            .then(() => actions.resetForm())
            .then(() => navigate(`/account/registerSuccess?email=${email}`))
            .catch((error) => console.log(error));
    };

    const content = (
        <section className="p-2 mt-10 dark:bg-gray-900">
            <Formik
                initialValues={{ email: '', username: '', password: '', rePass: '' }}
                validationSchema={registerSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form
                        onSubmit={handleSubmit}
                        autoComplete='off'
                        className="flex max-w-md flex-col gap-4 mx-auto"
                        data-testid="form-register"
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
                            data-testid="register-password"
                        />

                        {/* RePass - REPEAT PASSWORD */}
                        <CustomTextInput
                            placeholder="********"
                            name="rePass"
                            label="Repeat password"
                            type="password"
                            data-testid="register-rePass"
                        />

                        {/* SUBMIT */}
                        <CustomButton
                            isValid={isValid}
                            dirty={dirty}
                            isSubmitting={isSubmitting}
                            value='Register'
                        />
                    </Form>
                )}
            </Formik>

            {/* FACEBOOK SIGN IN BUTTON */}
            <FbLogin />

            {/* LOGIN LINK */}
            <p className='mx-auto mt-6 max-w-md w-full text-center text-gray-500 dark:text-gray-300 md:mt-12'>
                <span>Already have an account? </span>
                <NavLink
                    className="underline text-purple-500"
                    to="/login"
                >Login Here.</NavLink>
            </p>
        </section>
    );

    return content;
};

export default Register;