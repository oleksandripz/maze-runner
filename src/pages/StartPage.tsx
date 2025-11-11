import React, { useState } from 'react';
import Layout from '../components/layout';
import Button from '../components/button';
import SettingsForm from '../components/SettingsForm';
import { useSettings } from '../context/SettingsContext';

interface StartPageProps {
    onStart: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
    const [showSettings, setShowSettings] = useState(false);
    const { settings } = useSettings();

    return (
        <Layout>
            <div className="page">
                <h1>Maze Runner</h1>
                <p>Пройди лабіринт якомога швидше!</p>
                <p>Керування: WASD або стрілки</p>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 12 }}>
                    <Button text="Почати гру" onClick={onStart} />
                    <button className="btn btn-secondary" onClick={() => setShowSettings(!showSettings)}>
                        Налаштування
                    </button>
                </div>

                {showSettings && (
                    <div className="settings-panel">
                        <SettingsForm onClose={() => setShowSettings(false)} />
                    </div>
                )}

                <div style={{ marginTop: 16, fontSize: '0.9rem', color: '#bbb' }}>
                    Поточна складність: <b>{settings.difficulty}</b>
                    (розмір лабіринту: {settings.mazeSize}×{settings.mazeSize})
                </div>
            </div>
        </Layout>
    );
};

export default StartPage;