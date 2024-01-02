import { Route, Routes } from 'react-router-dom';
import './App.css';

import Home from '../src/components/Home';
import Login from '../src/features/auth/Login';
import Register from './features/auth/Register';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
        </Routes>
    )
};

export default App;
