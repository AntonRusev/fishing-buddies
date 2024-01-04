import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useLoginMutation } from '../auth/authApiSlice';
import { setCredentials } from '../auth/authSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [login] = useLoginMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await login({ email, password }).unwrap();

            dispatch(setCredentials({ ...userData, email }));
            localStorage.setItem("userData", JSON.stringify(userData));

            setEmail('');
            setPassword('');
            navigate('/');
        } catch (err) {
            console.log(err);
        };
    };

    const handleEmailInput = (e) => setEmail(e.target.value);

    const handlePasswordInput = (e) => setPassword(e.target.value);

    const content = (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            {/* EMAIL */}
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="email"
                    name="floating_email"
                    id="floating_email"
                    onChange={handleEmailInput}
                    value={email}
                    placeholder=" "
                    required
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 
                    appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 
                    focus:border-blue-600 peer"
                />
                <label
                    htmlFor="floating_email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 
                    transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 
                    rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                    peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Email address
                </label>
            </div>

            {/* PASSWORD */}
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="password"
                    name="floating_password"
                    id="floating_password"
                    onChange={handlePasswordInput}
                    value={password}
                    placeholder=" "
                    required
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 
                    appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 
                    focus:border-blue-600 peer"
                />
                <label
                    htmlFor="floating_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 
                    transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 
                    peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                    peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Password
                </label>
            </div>

            {/* SUBMIT BUTTON */}
            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
            dark:focus:ring-blue-800"
            >
                Submit
            </button>
        </form>
    );

    return content;
}
export default Login;