import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { setCredentials } from '../auth/authSlice';
import { useLoginMutation } from '../auth/authApiSlice';
import { useNavigate } from 'react-router-dom';

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

    const handlePwdInput = (e) => setPassword(e.target.value);

    const content = (
        <section className="login">

            <h1>Login</h1>

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

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={handlePwdInput}
                    value={password}
                    required
                />
                <button>Sign In</button>
            </form>
        </section>
    );

    return content;
}
export default Login;