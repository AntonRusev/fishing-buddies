import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';

import { useRegisterMutation } from '../auth/authApiSlice';
import { setCredentials } from '../auth/authSlice';

import { CustomTextInput, CustomButton } from '../../components/common/form';

import { registerSchema } from '../../utils/schemas';
import FbLogin from './FbLogin';

const Register = () => {
    const [register] = useRegisterMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (values, actions) => {
        const { rePass, ...obj } = values;
        const email = obj.email;

        // using params: email, username and password 
        await register({ ...obj })
            .unwrap()
            .then((payload) => dispatch(setCredentials({ ...payload, email })))
            .then(() => actions.resetForm())
            .then(() => navigate('/events'))
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
        </section>
    );

    return content;
};

export default Register;