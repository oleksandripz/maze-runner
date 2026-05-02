import { useState, useEffect, useCallback, useRef } from 'react';

interface Position { row: number; col: number; }

interface UseMazeResult {
    playerPosition: Position;
    isGameWon: boolean;
    moves: number;
    time: number;
    resetGame: () => void;
    items: Position[];
    collected: number;
}

export const useMaze = (
    maze: number[][],
    start: Position,
    exit: Position,
    config?: { cooldownMs?: number; itemsCount?: number }
): UseMazeResult => {
    const cooldownMs = config?.cooldownMs ?? 0;
    const itemsCount = config?.itemsCount ?? 0;

    const [playerPosition, setPlayerPosition] = useState<Position>(start);
    const [isGameWon, setIsGameWon] = useState(false);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [items, setItems] = useState<Position[]>([]);
    const [collected, setCollected] = useState(0);

    const lastMoveRef = useRef<number>(0);

    useEffect(() => {
        if (isGameWon) return;
        const timer = setInterval(() => setTime(prev => prev + 1), 1000);
        return () => clearInterval(timer);
    }, [isGameWon]);

    const canMoveTo = useCallback((row: number, col: number): boolean => {
        if (row < 0 || row >= maze.length || col < 0 || col >= maze[0].length) return false;
        return maze[row][col] === 0;
    }, [maze]);

    useEffect(() => {
        const freeCells: Position[] = [];
        for (let r = 0; r < maze.length; r++) for (let c = 0; c < maze[0].length; c++) {
            if (maze[r][c] === 0) freeCells.push({ row: r, col: c });
        }
        const filtered = freeCells.filter(p => !(p.row === start.row && p.col === start.col) && !(p.row === exit.row && p.col === exit.col));
        const chosen: Position[] = [];
        const count = Math.min(itemsCount, filtered.length);
        for (let i = 0; i < count; i++) {
            const idx = Math.floor(Math.random() * filtered.length);
            chosen.push(filtered.splice(idx, 1)[0]);
        }
        setItems(chosen);
        setCollected(0);
    }, [maze, start.row, start.col, exit.row, exit.col, itemsCount]);

    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        if (isGameWon) return;
        const now = Date.now();
        if (now - lastMoveRef.current < (cooldownMs ?? 0)) return;

        let newRow = playerPosition.row;
        let newCol = playerPosition.col;

        switch (event.key) {
            case 'ArrowUp': case 'w': case 'W': newRow -= 1; break;
            case 'ArrowDown': case 's': case 'S': newRow += 1; break;
            case 'ArrowLeft': case 'a': case 'A': newCol -= 1; break;
            case 'ArrowRight': case 'd': case 'D': newCol += 1; break;
            default: return;
        }

        event.preventDefault();

        if (canMoveTo(newRow, newCol)) {
            lastMoveRef.current = now;
            setPlayerPosition({ row: newRow, col: newCol });
            setMoves(prev => prev + 1);

            setItems(prevItems => {
                const idx = prevItems.findIndex(p => p.row === newRow && p.col === newCol);
                if (idx >= 0) {
                    const copy = [...prevItems];
                    copy.splice(idx, 1);
                    setCollected(prev => prev + 1);
                    return copy;
                }
                return prevItems;
            });

            if (newRow === exit.row && newCol === exit.col) {
                setIsGameWon(true);
            }
        }
    }, [playerPosition, isGameWon, canMoveTo, exit, cooldownMs]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    const resetGame = () => {
        setPlayerPosition(start);
        setIsGameWon(false);
        setMoves(0);
        setTime(0);
        setCollected(0);
    };

    return { playerPosition, isGameWon, moves, time, resetGame, items, collected };
};