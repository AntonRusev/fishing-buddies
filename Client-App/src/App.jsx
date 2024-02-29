import { useEffect } from 'react';

import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Flowbite } from 'flowbite-react';
import { ToastContainer } from 'react-toastify';

import { setCredentials } from './features/auth/authSlice';

import Home from '../src/components/Home';
import Login from '../src/features/auth/Login';
import Register from './features/auth/Register';
import Header from './components/Header';
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

import './App.css';

function App() {
    const dispatch = useDispatch();

    // For development only / TODO
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userData"));
        if (user) {
            dispatch(setCredentials({ ...user }));
        };
    }, []);

    return (
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
                <main className='flex flex-col h-screen font-lato pt-14 dark:bg-gray-900'>
                    <Routes>
                        {/* Routes accessible by both guests and authenticated users */}
                        <Route path='/' element={<Home />} />
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

export default App;