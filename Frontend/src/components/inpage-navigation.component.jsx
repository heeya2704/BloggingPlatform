import React from 'react';
import '../pages/home.css';

const InPageNavigation = ({ routes, activeRoute, onRouteChange }) => {
    return (
        <div className='relative mb-8 bg-white border-b border-gray-300 flex flex-nowrap overflow-x-auto'>
            {routes.map((route, i) => {
                const isActive = route.toLowerCase() === activeRoute.toLowerCase();

                return (
                    <button
                        key={i}
                        onClick={() => onRouteChange(route)}
                        className={`nav-button ${isActive ? 'text-black-800' : ''}`}
                    >
                        {route}
                    </button>
                );
            })}
        </div>
    );
};

export default InPageNavigation;
