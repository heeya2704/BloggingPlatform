import React from 'react';
import Navbar from '../components/navbar.component'; // Import your Navbar component
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            <Navbar />
            <Outlet /> {/* This renders the component for the current route */}
        </div>
    );
};

export default Layout;
