import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout';
import Button from '../components/button';
import SettingsForm from '../components/SettingsForm';
import { useSettings } from '../context/SettingsContext';

const StartPage: React.FC = () => {
    const [showSettings, setShowSettings] = useState(false);
    const [userId, setUserId] = useState('');
    const { settings } = useSettings();
    const navigate = useNavigate();

    const handleStart = () => {
        if (!userId.trim()) {
            alert("Будь ласка, введіть ім'я гравця!");
            return;
        }
        navigate(`/game/${userId.trim()}`);
    };

    return (
        <Layout>
            <div className="page">
                <h1>Maze Runner</h1>
                <p>Пройди лабіринт якомога швидше!</p>

                <div style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
                    <input
                        type="text"
                        placeholder="Введіть ваше ім'я"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #444',
                            background: '#222',
                            color: '#fff',
                            fontSize: '1rem',
                            textAlign: 'center',
                            marginBottom: '10px'
                        }}
                    />
                </div>

                <p>Керування: WASD або стрілки</p>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 12 }}>
                    <Button text="Почати гру" onClick={handleStart} />
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