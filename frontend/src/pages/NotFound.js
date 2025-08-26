import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="center-screen">
      <div className="text-center space-y-4">
        <div className="text-7xl">🚫</div>
        <h1 className="text-3xl font-bold text-white">Page not found</h1>
        <p className="text-gray-300">The page you are looking for does not exist.</p>
        <Link to="/" className="btn-primary max-w-xs mx-auto">Go home</Link>
      </div>
    </div>
  );
}


