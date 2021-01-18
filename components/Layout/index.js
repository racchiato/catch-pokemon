import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const NavbarComponent = dynamic(() => import('../Navbar'));

const Layout = ({
    title = "Catch the Pokemon",
    children
}) => (
    <div>
        <Head>
            <title>{title}</title>
        </Head>
        <header>
            <NavbarComponent />
        </header>
        {children}
    </div>
)

export default Layout;