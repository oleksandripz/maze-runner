/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Difficulty = 'easy' | 'normal' | 'hard';

export interface Settings {
    difficulty: Difficulty;
    mazeSize: number;
}

const STORAGE_KEY = 'maze_settings_v4';

const defaultSettings: Settings = {
    difficulty: 'normal',
    mazeSize: 31,
};

const difficultyToSize: Record<Difficulty, number> = {
    easy: 15,
    normal: 31,
    hard: 41,
};

const SettingsContext = createContext<{
    settings: Settings;
    setSettings: (s: Partial<Settings>) => void;
}>({
    settings: defaultSettings,
    setSettings: () => { },
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettingsState] = useState<Settings>(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) return JSON.parse(raw) as Settings;
        } catch {
            // ignore errors
        }
        return defaultSettings;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }, [settings]);

    const setSettings = (s: Partial<Settings>) => {
        setSettingsState(prev => {
            const merged = { ...prev, ...s };
            if (s.difficulty) merged.mazeSize = difficultyToSize[s.difficulty];
            return merged;
        });
    };

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);