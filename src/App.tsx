import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';
import CookieModal from './components/CookieModal';

const App: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/game/:userId" element={<GamePage />} />
                <Route path="/results/:userId" element={<ResultsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <CookieModal />
        </>
    );
};

export default App;