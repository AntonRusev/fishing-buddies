import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { setCredentials } from '../auth/authSlice';
import { useRegisterMutation } from '../auth/authApiSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [register] = useRegisterMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await register({ email, username, password }).unwrap();

            dispatch(setCredentials({ ...userData, email }));
            localStorage.setItem("userData", JSON.stringify(userData));

            setEmail('');
            setUsername('');
            setPassword('');

            navigate('/');
        } catch (err) {
            console.log(err);
        };
    };

    const handleEmailInput = (e) => setEmail(e.target.value);

    const handleUsernameInput = (e) => setUsername(e.target.value);

    const handlePwdInput = (e) => setPassword(e.target.value);

    const content = (
        <section className="register">

            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={handleEmailInput}
                    autoComplete="off"
                    required
                />

                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameInput}
                    autoComplete="off"
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={handlePwdInput}
                    value={password}
                    required
                />
                <button>Register</button>
            </form>
        </section>
    );

    return content;
}
export default Register;