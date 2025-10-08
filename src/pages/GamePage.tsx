import React from "react";
import Layout from "../components/layout";
import "../styles/main.css";

interface GamePageProps {
    onEnd: () => void;
}

const GamePage: React.FC<GamePageProps> = ({ onEnd }) => {
    const maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    const start = { row: 1, col: 1 };
    const exit = { row: 10, col: 11 };


    return (
        <Layout>
            <div className="page">
                <h2>Основна сторінка гри</h2>
                <div className="maze-grid">
                    {maze.map((row, rowIndex) => (
                        <div key={rowIndex} className="maze-row">
                            {row.map((cell, colIndex) => {
                                let cellClass = cell === 1 ? "wall" : "path";
                                if (rowIndex === start.row && colIndex === start.col) {
                                    cellClass = "start";
                                }
                                if (rowIndex === exit.row && colIndex === exit.col) {
                                    cellClass = "exit";
                                }
                                return (
                                    <div
                                        key={colIndex}
                                        className={`maze-cell ${cellClass}`}
                                    ></div>
                                );
                            })}
                        </div>
                    ))}
                </div>
                <button className="btn" onClick={onEnd}>
                    Завершити гру
                </button>
            </div>
        </Layout>
    );
};

export default GamePage;
