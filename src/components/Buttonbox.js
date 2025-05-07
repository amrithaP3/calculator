import React from 'react';

export default function ButtonBox({ children }) {
    return (
        <div className="grid grid-cols-4 gap-4">
            {children}
        </div>
    );
}