import React from 'react';
import Layout from '../components/layout';
import Button from '../components/button';

interface ResultsPageProps {
    onRestart: () => void;
    moves: number;
    time: number;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ onRestart, moves, time }) => {
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getPerformanceRating = (): string => {
        if (moves < 50 && time < 60) return "Відмінно!";
        if (moves < 80 && time < 120) return "Добре!";
        if (moves < 120 && time < 180) return "Непогано!";
        return "Завершено!";
    };

    return (
        <Layout>
            <div className="page">
                <h1>Результати</h1>
                <div className="results-card">
                    <h2>{getPerformanceRating()}</h2>
                    <div className="stats">
                        <div className="stat-item">
                            <span className="stat-label">Час:</span>
                            <span className="stat-value">{formatTime(time)}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Кроків:</span>
                            <span className="stat-value">{moves}</span>
                        </div>
                    </div>
                    <p className="completion-message">Ти успішно пройшов лабіринт!</p>
                </div>
                <Button text="Грати знову" onClick={onRestart} />
            </div>
        </Layout>
    );
};

export default ResultsPage;