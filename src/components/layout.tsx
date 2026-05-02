import React from 'react';
import Header from './header';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="layout">
        <Header />
        <main>{children}</main>
    </div>
);

export default Layout;
