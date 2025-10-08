import React, { useState } from 'react';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';
import Layout from './components/layout';

const App: React.FC = () => {
    const [page, setPage] = useState<'start' | 'game' | 'results'>('start');

    const renderPage = () => {
        switch (page) {
            case 'game': return <GamePage onEnd={() => setPage('results')} />;
            case 'results': return <ResultsPage onRestart={() => setPage('start')} />;
            default: return <StartPage onStart={() => setPage('game')} />;
        }
    };

    return (
        <Layout>
            {renderPage()}
        </Layout>
    );
};

export default App;
