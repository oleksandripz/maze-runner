import { useState, useEffect, useCallback } from 'react';

interface Position {
    row: number;
    col: number;
}

interface UseMazeResult {
    playerPosition: Position;
    isGameWon: boolean;
    moves: number;
    time: number;
    resetGame: () => void;
}

export const useMaze = (
    maze: number[][],
    start: Position,
    exit: Position
): UseMazeResult => {
    const [playerPosition, setPlayerPosition] = useState<Position>(start);
    const [isGameWon, setIsGameWon] = useState(false);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);

    useEffect(() => {
        if (isGameWon) return;

        const timer = setInterval(() => {
            setTime(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isGameWon]);

    const canMoveTo = useCallback((row: number, col: number): boolean => {
        if (row < 0 || row >= maze.length || col < 0 || col >= maze[0].length) {
            return false;
        }
        return maze[row][col] === 0;
    }, [maze]);

    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        if (isGameWon) return;

        let newRow = playerPosition.row;
        let newCol = playerPosition.col;

        switch (event.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                newRow -= 1;
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                newRow += 1;
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                newCol -= 1;
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                newCol += 1;
                break;
            default:
                return;
        }

        event.preventDefault();

        if (canMoveTo(newRow, newCol)) {
            setPlayerPosition({ row: newRow, col: newCol });
            setMoves(prev => prev + 1);

            if (newRow === exit.row && newCol === exit.col) {
                setIsGameWon(true);
            }
        }
    }, [playerPosition, isGameWon, canMoveTo, exit]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    const resetGame = useCallback(() => {
        setPlayerPosition(start);
        setIsGameWon(false);
        setMoves(0);
        setTime(0);
    }, [start]);

    return {
        playerPosition,
        isGameWon,
        moves,
        time,
        resetGame
    };
};