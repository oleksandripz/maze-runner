import React from 'react';
import ReactDOM from 'react-dom';

interface EndDialogProps {
    moves: number;
    time: number;
    onNextLevel: () => void;
    onRestart: () => void;
    onClose?: () => void;
}

const EndDialog: React.FC<EndDialogProps> = ({ moves, time, onNextLevel, onRestart, onClose }) => {
    const content = (
        <div className="end-dialog-backdrop" onClick={onClose}>
            <div className="end-dialog" onClick={e => e.stopPropagation()}>
                <h2>Гра завершена</h2>
                <p>Кроків: {moves}</p>
                <p>Час: {Math.floor(time / 60).toString().padStart(2, '0')}:{(time % 60).toString().padStart(2, '0')}</p>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 12 }}>
                    <button className="btn" onClick={onNextLevel}>Наступний тур</button>
                    <button className="btn btn-secondary" onClick={onRestart}>Спробувати знову</button>
                </div>
            </div>
        </div>
    );

    const root = document.getElementById('modal-root') || document.body;
    return ReactDOM.createPortal(content, root!);
};

export default EndDialog;