import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { Button } from 'flowbite-react';

import { useFbLoginMutation } from './authApiSlice';
import { setCredentials } from './authSlice';

import { FaFacebookF } from "react-icons/fa";

const FbLogin = () => {
    const [fbLogin, { isLoading }] = useFbLoginMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFbSubmit = async (accessToken) => {
        // we get the accessToken as a response from Facebook
        await fbLogin(accessToken)
            .unwrap()
            .then((payload) => dispatch(setCredentials({ ...payload })))
            .then(() => navigate('/events'))
            .catch((error) => console.log(error));
    };

    const content = (
        <div className='mx-auto mt-2 max-w-md w-full'>
            {/* Divide line from the previous element with "or" in the middle */}
            {/* ------------- or ------------- */}
            <div className="flex items-center">
                <div className="flex-grow border-t border-gray-500"></div>
                <div className="mx-4 text-gray-500">or</div>
                <div className="flex-grow border-t border-gray-500"></div>
            </div>

            {/* FACEBOOK SIGN IN BUTTON */}
            <Button
                as={FacebookLogin}
                appId='3618209665088182'
                onSuccess={(response) => {
                    handleFbSubmit(response.accessToken);
                }}
                onFail={(response) => {
                    console.log('Login Failed!', response)
                }}
                className='mx-auto mt-2 w-full'
                isProcessing={isLoading}
                color="blue"
            >
                <FaFacebookF className="mr-2 h-5 w-5" />
                Sign in with Facebook
            </Button>
        </div>
    );

    return content;
};

export default FbLogin;