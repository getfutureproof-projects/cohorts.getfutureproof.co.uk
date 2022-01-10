import React from 'react';

export const Section = ({ children })=> {
    return (
        <div
            style={{
                display: 'flex', justifyContent: 'space-around', padding: '30px' }}>
            { children }
        </div>

    )
};