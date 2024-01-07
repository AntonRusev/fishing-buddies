import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';

import { useLoginMutation } from '../auth/authApiSlice';
import { setCredentials } from '../auth/authSlice';
import BreadcrumbNav from '../../components/common/Breadcrumb';

import { loginSchema } from '../../utils/schemas';
import { MyTextInput, MyCheckbox } from '../../components/common/form';
import { MyButton } from '../../components/common/form'

const Login = () => {
    const [persistAuth, setPersistAuth] = useState(false);
    const [login] = useLoginMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (values, actions) => {
        try {
            const userData = await login(values).unwrap();

            const email = values.email;
            dispatch(setCredentials({ ...userData, email, persistAuth }));

            actions.resetForm();
            navigate('/');
        } catch (err) {
            console.log(err);
        };
    };

    const rememberUserHandler = () => {
        setPersistAuth(!persistAuth);
        console.log(persistAuth);
    };

    const content = (
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
                        className="flex max-w-md flex-col gap-4 mx-auto"
                    >
                        {/* EMAIL */}
                        <MyTextInput
                            placeholder="name@email.com"
                            name="email"
                            label="Your email"
                            type="email"
                        />

                        {/* PASSWORD */}
                        <MyTextInput
                            placeholder="********"
                            name="password"
                            label="Your password"
                            type="password"
                        />

                        {/* CHECKBOX */}
                        <MyCheckbox handler={rememberUserHandler} />

                        {/* SUBMIT */}
                        <MyButton
                            isValid={isValid}
                            dirty={dirty}
                            isSubmitting={isSubmitting}
                            value='Login'
                        />
                    </Form>
                </>
            )}
        </Formik>
    );

    return content;
}
export default Login;