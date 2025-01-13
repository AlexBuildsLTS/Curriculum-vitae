import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import './index.css'; // Import your Tailwind + custom CSS

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/* Wrap entire app in ThemeProvider */}
        <ThemeProvider>
            {/* Single router for the whole app */}
            <Router>
                <App />
            </Router>
        </ThemeProvider>
    </React.StrictMode>
);
