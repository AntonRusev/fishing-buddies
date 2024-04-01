import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { Form, Formik } from 'formik';

import { useLoginMutation } from '../auth/authApiSlice';
import { setCredentials } from '../auth/authSlice';

import FbLogin from './FbLogin';
import { CustomTextInput, CustomButton } from '../../components/common/form';

import { loginSchema } from '../../utils/schemas';

const Login = () => {
    const [login] = useLoginMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (values, actions) => {
        const { ...obj } = values;
        const email = obj.email;

        // using params: email and password 
        await login({ ...obj })
            .unwrap()
            .then((payload) => dispatch(setCredentials({ ...payload, email })))
            .then(() => actions.resetForm())
            .then(() => navigate('/events'))
            .catch((error) => console.log(error));
    };

    const content = (
        <section className="p-2 mt-10 dark:bg-gray-900">
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form
                        onSubmit={handleSubmit}
                        autoComplete='off'
                        className="flex max-w-md flex-col gap-4 mx-auto dark:bg-gray-900"
                        data-testid="form-login"
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

                        {/* SUBMIT */}
                        <CustomButton
                            isValid={isValid}
                            dirty={dirty}
                            isSubmitting={isSubmitting}
                            value='Login'
                        />
                    </Form>
                )}
            </Formik>

            {/* FACEBOOK SIGN IN BUTTON */}
            <FbLogin />

            {/* REGISTER LINK */}
            <p className='mx-auto mt-6 max-w-md w-full text-center text-gray-500 dark:text-gray-300 md:mt-12'>
                <span>Don't have account yet? </span>
                <NavLink
                    className="underline text-purple-500"
                    to="/register"
                >Register Now.</NavLink>
            </p>
        </section>
    );

    return content;
};

export default Login;