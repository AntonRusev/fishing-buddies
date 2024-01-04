import { Route, Routes } from 'react-router-dom';
import './App.css';

import Home from '../src/components/Home';
import Login from '../src/features/auth/Login';
import Register from './features/auth/Register';
import Header from './components/Header';
import EventForm from './features/events/EventForm';
import EventsList from './features/events/EventsList';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/events' element={<EventsList />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/create' element={<EventForm />} />
            </Routes>
        </>
    )
};

export default App;
