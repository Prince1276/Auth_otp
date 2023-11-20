import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import OTPValidation from './OTPValidation';
import Home from './Home';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<OTPValidation />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default App;
