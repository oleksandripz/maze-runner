import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/layout';
import Button from '../components/button';

const ResultsPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    const { moves, time } = location.state || { moves: 0, time: 0 };

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getPerformanceRating = (): string => {
        if (moves === 0) return "Спробуй зіграти!";
        if (moves < 50 && time < 60) return "Відмінно!";
        if (moves < 80 && time < 120) return "Добре!";
        if (moves < 120 && time < 180) return "Непогано!";
        return "Завершено!";
    };

    const handleRestart = () => {
        navigate('/');
    };

    return (
        <Layout>
            <div className="page">
                <h1>Результати: {userId}</h1>
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
                    <p className="completion-message">
                        {moves > 0 ? "Ти успішно пройшов лабіринт!" : "Даних про гру немає"}
                    </p>
                </div>
                <Button text="На головну" onClick={handleRestart} />
            </div>
        </Layout>
    );
};

export default ResultsPage;