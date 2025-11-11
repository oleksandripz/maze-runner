import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSettings } from '../context/SettingsContext';
import type { Difficulty } from '../context/SettingsContext';

interface FormValues {
    difficulty: Difficulty;
}

const schema = yup.object({
    difficulty: yup.mixed<Difficulty>().oneOf(['easy', 'normal', 'hard']).required(),
}).required();

const SettingsForm: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
    const { settings, setSettings } = useSettings();

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: { difficulty: settings.difficulty },
    });

    const onSubmit = (data: FormValues) => {
        setSettings(data);
        if (onClose) onClose();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="settings-form" style={{ maxWidth: 420 }}>
            <div>
                <label>Рівень складності</label>
                <select {...register('difficulty')}>
                    <option value="easy">Легкий</option>
                    <option value="normal">Середній</option>
                    <option value="hard">Складний</option>
                </select>
                {errors.difficulty && <div className="error">{errors.difficulty.message}</div>}
            </div>

            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                <button type="submit" className="btn">Зберегти</button>
                {onClose && (
                    <button type="button" className="btn btn-secondary" onClick={onClose}>
                        Скасувати
                    </button>
                )}
            </div>
        </form>
    );
};

export default SettingsForm;