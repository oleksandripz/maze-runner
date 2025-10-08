import React from 'react';
import Button from '../components/button';

interface StartPageProps {
    onStart: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => (
    <div className="page">
        <h1>Мандрівник у лабіринті</h1>
        <p>Натисни, щоб почати пригоду!</p>
        <Button text="Почати гру" onClick={onStart} />
    </div>
);

export default StartPage;
