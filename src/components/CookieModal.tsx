import React, { useState, useEffect } from 'react';

const CookieModal: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [preferences, setPreferences] = useState({
        essential: true, // Завжди true
        analytics: false,
        marketing: false
    });

    useEffect(() => {
        const consent = localStorage.getItem('maze-runner-consent');
        if (!consent) setIsVisible(true);
    }, []);

    const handleSave = () => {
        localStorage.setItem('maze-runner-consent', JSON.stringify(preferences));
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div style={{
            position: 'fixed', bottom: '20px', left: '20px', right: '20px',
            background: '#1a1a1a', color: 'white', padding: '20px',
            borderRadius: '8px', boxShadow: '0 0 20px rgba(0,0,0,0.5)', zIndex: 10000,
            border: '1px solid #333'
        }}>
            <h3>Налаштування файлів Cookie</h3>
            <p style={{ fontSize: '14px', color: '#ccc' }}>
                Ми використовуємо файли cookie для покращення роботи гри. Оберіть, які дані ви дозволяєте відстежувати.
            </p>

            <div style={{ margin: '15px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Обов'язкові (Технічні)</span>
                    <input type="checkbox" checked disabled />
                </label>
                <label style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <span>Аналітика (Статистика гри)</span>
                    <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={() => setPreferences({...preferences, analytics: !preferences.analytics})}
                    />
                </label>
                <label style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <span>Маркетинг (Персоналізація)</span>
                    <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={() => setPreferences({...preferences, marketing: !preferences.marketing})}
                    />
                </label>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button onClick={handleSave} style={{
                    background: '#f1d600', color: 'black', border: 'none',
                    padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
                }}>
                    Зберегти налаштування
                </button>
                <button onClick={() => { setPreferences({essential: true, analytics: true, marketing: true}); handleSave(); }}
                    style={{ background: 'transparent', color: '#f1d600', border: '1px solid #f1d600', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}>
                    Прийняти всі
                </button>
            </div>
        </div>
    );
};

export default CookieModal;