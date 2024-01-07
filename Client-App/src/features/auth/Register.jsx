import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';

import { useRegisterMutation } from '../auth/authApiSlice';
import { setCredentials } from '../auth/authSlice';

import BreadcrumbNav from '../../components/common/Breadcrumb';
import { MyTextInput, MyCheckbox, MyButton } from '../../components/common/form';
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

            const userData = await register({ ...obj }).unwrap();

            dispatch(setCredentials({ ...userData, email, persistAuth }));

            actions.resetForm();
            navigate('/');
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
                        <MyTextInput
                            placeholder="name@email.com"
                            name="email"
                            label="Your email"
                            type="email"
                        />

                        {/* USERNAME */}
                        <MyTextInput
                            placeholder="Username"
                            name="username"
                            label="Your username"
                            type="text"
                        />

                        {/* PASSWORD */}
                        <MyTextInput
                            placeholder="********"
                            name="password"
                            label="Your password"
                            type="password"
                        />

                        {/* RePass - REPEAT PASSWORD */}
                        <MyTextInput
                            placeholder="********"
                            name="rePass"
                            label="Repeat password"
                            type="password"
                        />

                        {/* CHECKBOX */}
                        <MyCheckbox name="persistAuth" />

                        {/* SUBMIT */}
                        <MyButton
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