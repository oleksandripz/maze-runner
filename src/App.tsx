import React, { useState } from 'react';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';
import Layout from './components/layout';

const App: React.FC = () => {
    const [page, setPage] = useState<'start' | 'game' | 'results'>('start');
    const [gameStats, setGameStats] = useState({ moves: 0, time: 0 });

    const handleGameEnd = (moves: number, time: number) => {
        setGameStats({ moves, time });
        setPage('results');
    };

    const handleRestart = () => {
        setGameStats({ moves: 0, time: 0 });
        setPage('start');
    };

    const handleStart = () => {
        setGameStats({ moves: 0, time: 0 });
        setPage('game');
    };

    const renderPage = () => {
        switch (page) {
            case 'game':
                return <GamePage onEnd={handleGameEnd} />;
            case 'results':
                return (
                    <ResultsPage
                        onRestart={handleRestart}
                        moves={gameStats.moves}
                        time={gameStats.time}
                    />
                );
            default:
                return <StartPage onStart={handleStart} />;
        }
    };

    return <>{renderPage()}</>;
};

export default App;