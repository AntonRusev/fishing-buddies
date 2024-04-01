import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Flowbite } from 'flowbite-react';
import { ToastContainer } from 'react-toastify';

import { useLazyGetAuthUserQuery } from './features/auth/authApiSlice';
import { selectUser, setCredentials, setToken } from './features/auth/authSlice';

import Home from '../src/components/Home';
import Header from './components/Header';
import Login from '../src/features/auth/Login';
import Register from './features/auth/Register';
import RegisterSuccess from './features/auth/RegisterSuccess';
import ConfirmEmail from './features/auth/ConfirmEmail';
import EventDashboard from './features/events/EventDashboard';
import EventForm from './features/events/EventForm';
import EventDetails from './features/events/details/EventDetails';
import ErrorPage from './components/errors/ErrorPage';
import ProfilePage from './features/profiles/ProfilePage';
import ProfilePhotos from './features/profiles/ProfilePhotos';
import ProfileFollowings from './features/profiles/ProfileFollowings';
import ProfileEvents from './features/profiles/ProfileEvents';
import RequireAuth from './features/auth/RequireAuth';
import GuestOnly from './features/auth/GuestOnly';
import TokenComponent from './components/TokenComponent';
import About from './components/About';
import CustomSpinner from './components/common/CustomSpinner';

import './App.css';

function App() {
    const user = useSelector(selectUser);
    const [trigger, { isLoading }] = useLazyGetAuthUserQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        const storageToken = JSON.parse(localStorage.getItem("token"));

        // If there is Token in the Local Storage but not in the state,
        // set the one from the storage into the state, then fetch the User
        if (storageToken && user.token === null) {
            dispatch(setToken(storageToken));

            trigger()
                .unwrap()
                .then(user => dispatch(setCredentials(user)))
                .catch((error) => console.log(error));
        };
    }, [user]);

    let content;

    if (isLoading) {
        // LOADER/SPINNER
        content = (
            <div className='flex flex-col items-center justify-center h-screen w-full dark:bg-gray-900'>
                <CustomSpinner text="Application is loading..." />
            </div>
        );
    } else {
        // THE APPLICATION
        content = (
            <>
                {/* TOAST */}
                <ToastContainer
                    position='bottom-center'
                    hideProgressBar
                    theme='colored'
                    pauseOnHover
                />

                <Flowbite>
                    {/* Header */}
                    <Header />

                    {/* Refresh Token Functionality */}
                    <TokenComponent />

                    <main className='flex flex-col min-h-screen font-lato pt-14 dark:bg-gray-900'>
                        <Routes>
                            {/* Routes accessible by both guests and authenticated users */}
                            <Route path='/' element={<Home />} />
                            <Route path='/about' element={<About />} />
                            <Route path='/events' element={<EventDashboard />} />
                            <Route path='/events/:id' element={<EventDetails />} />

                            {/* Profile paths */}
                            <Route path='/profile/:username' element={<ProfilePage />} />
                            <Route path='/profile/:username/photos' element={<ProfilePhotos />} />
                            <Route path='/profile/:username/followers' element={<ProfileFollowings />} />
                            <Route path='/profile/:username/following' element={<ProfileFollowings />} />
                            <Route path='/profile/:username/events' element={<ProfileEvents />} />

                            {/* Route Guard protection for authenticated(logged in) users only */}
                            <Route element={<RequireAuth />}>
                                <Route path='/create' element={<EventForm />} />
                                <Route path='/manage/:id' element={<EventForm />} />
                            </Route>

                            {/* Route Guard protection for guests only */}
                            <Route element={<GuestOnly />}>
                                <Route path='/login' element={<Login />} />
                                <Route path='/register' element={<Register />} />
                                <Route path='/account/registerSuccess' element={<RegisterSuccess />} />
                                <Route path='/account/verifyEmail' element={<ConfirmEmail />} />
                            </Route>

                            {/* SERVER ERROR */}
                            <Route path='/server-error' element={<ErrorPage />} />

                            {/* Not Fount */}
                            <Route path='/not-found' element={<ErrorPage />} />
                            <Route path='*' element={<Navigate replace to='not-found' />} />

                        </Routes>
                    </main>
                </Flowbite>
            </>
        );
    };

    return content;
};

export default App;