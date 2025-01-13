import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './App';
import {ThemeProvider} from './contexts/ThemeContext';
import {AuthProvider} from './contexts/AuthContext'; // Import AuthProvider
import './index.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <AuthProvider> {/* Wrap with AuthProvider */}
                <Router>
                    <App />
                </Router>
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>
);