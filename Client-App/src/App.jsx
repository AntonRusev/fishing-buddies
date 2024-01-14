import { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Flowbite } from 'flowbite-react';


import { setCredentials } from './features/auth/authSlice';

import Home from '../src/components/Home';
import Login from '../src/features/auth/Login';
import Register from './features/auth/Register';
import Header from './components/Header';
import EventForm from './features/events/EventForm';
import EventsList from './features/events/EventsList';
import EventDetails from './features/events/EventDetails';
import ProfilePage from './features/profiles/ProfilePage';
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
            <Flowbite>
                <Header />
                <main className='content-center dark:bg-gray-900'>
                    <Routes>
                        {/* Routes accessible by both guests and authenticated users */}
                        <Route path='/' element={<Home />} />
                        <Route path='/events' element={<EventsList />} />
                        <Route path='/events/:id' element={<EventDetails />} />
                        <Route path='/profiles/:username' element={<ProfilePage />} />

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
                    </Routes>
                </main>
            </Flowbite>
        </>
    );
};

export default App;
