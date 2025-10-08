import React from 'react';
import Button from '../components/button';

interface ResultsPageProps {
    onRestart: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ onRestart }) => (
    <div className="page">
        <h1>Результати</h1>
        <p>Твій шлях завершено!</p>
        <Button text="Повернутись на старт" onClick={onRestart} />
    </div>
);

export default ResultsPage;
