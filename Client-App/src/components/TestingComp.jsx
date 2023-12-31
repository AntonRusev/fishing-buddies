import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from '../features/auth/authSlice'
import { useLoginMutation } from '../features/auth/authApiSlice'

const TestingComp = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [login] = useLoginMutation()

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const userData = await login({ email, password }).unwrap()
            dispatch(setCredentials({ ...userData, email }))
            setEmail('')
            setPassword('')
        } catch (err) {
            console.log(err);
        }
    }

    const handleUserInput = (e) => setEmail(e.target.value)

    const handlePwdInput = (e) => setPassword(e.target.value)

    const content = (
        <section className="login">

            <h1>Employee Login</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Email:</label>
                <input
                    type="text"
                    id="username"
                    value={email}
                    onChange={handleUserInput}
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
    )

    return content
}
export default TestingComp