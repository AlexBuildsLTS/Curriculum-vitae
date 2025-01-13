/* src/App.tsx */
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import CalendarPage from './pages/CalendarPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const App: React.FC = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/calendar" element={<CalendarPage />} />

                {/* New login & signup routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Layout>
    );
};

export default App;
