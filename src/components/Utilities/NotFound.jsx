import React from 'react';
import { useNavigate } from 'react-router';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-100 text-blue-800">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-xl mb-6">Oops! The page you’re looking for doesn’t exist.</p>
            <button
                onClick={() => navigate('/')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all"
            >
                Go Back to Home
            </button>
        </div>
    );
};

export default NotFound;
