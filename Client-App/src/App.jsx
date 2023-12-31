import { Route, Routes } from 'react-router-dom';
import './App.css';
import TestingComp from './components/TestingComp';

function App() {
    return (
        <Routes>
            <Route path='/' element={<TestingComp />}>
            </Route>
        </Routes>
    )
};

export default App;
