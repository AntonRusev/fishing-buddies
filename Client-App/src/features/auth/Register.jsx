import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';

import { useRegisterMutation } from '../auth/authApiSlice';
import { setCredentials } from '../auth/authSlice';

import BreadcrumbNav from '../../components/common/Breadcrumb';
import { CustomTextInput, CustomCheckbox, CustomButton } from '../../components/common/form';

import { registerSchema } from '../../utils/schemas';

const Register = () => {
    const [register] = useRegisterMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // TODO Create a custom useHandleAuth hook for both Login and Register
    const handleSubmit = async (values, actions) => {
        try {
            const { persistAuth, rePass, ...obj } = values;

            const email = obj.email;

            // using params: email, username and password 
            const userData = await register({ ...obj }).unwrap();

            dispatch(setCredentials({ ...userData, email, persistAuth }));

            actions.resetForm();
            navigate('/events');
        } catch (err) {
            console.log(err);
        };
    };

    const content = (
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
    );

    return content;
}
export default Register;