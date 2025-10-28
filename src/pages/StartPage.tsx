import React from 'react';
import Layout from '../components/layout';
import Button from '../components/button';

interface StartPageProps {
    onStart: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => (
    <Layout>
        <div className="page">
            <h1>Maze Runner</h1>
            <p>Пройди лабіринт якомога швидше!</p>
            <p>Керування: WASD або стрілки</p>
            <Button text="Почати гру" onClick={onStart} />
        </div>
    </Layout>
);

export default StartPage;