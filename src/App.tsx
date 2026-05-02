import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';
import CookieConsent from 'react-cookie-consent';

const App: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/game/:userId" element={<GamePage />} />
                <Route path="/results/:userId" element={<ResultsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <CookieConsent
                location="bottom"
                buttonText="Зрозуміло та приймаю"
                cookieName="mazeRunnerGdprConsent"
                style={{ background: "#2B373B", zIndex: 9999 }}
                buttonStyle={{ background: "#f1d600", color: "#4e503b", fontSize: "14px", borderRadius: "4px", fontWeight: "bold" }}
                expires={150}
            >
                Ця гра використовує файли cookie для збереження ваших налаштувань інтерфейсу та покращення користувацького досвіду згідно з політикою GDPR.
            </CookieConsent>
        </>
    );
};

export default App;