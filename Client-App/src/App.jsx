import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './App.css';

import { setCredentials } from './features/auth/authSlice';

import Home from '../src/components/Home';
import Login from '../src/features/auth/Login';
import Register from './features/auth/Register';
import Header from './components/Header';
import EventForm from './features/events/EventForm';
import EventsList from './features/events/EventsList';
import EventDetails from './features/events/EventDetails';

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
            <Header />
            <main className='content-center'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/events' element={<EventsList />} />
                    <Route path='/events/:id' element={<EventDetails />} />
                    <Route path='/create' element={<EventForm />} />
                </Routes>
            </main>
        </>
    )
};

export default App;
