import React from 'react';

const button = ({ clicked, children }) => (
    <button 
        type="submit"
        onClick={clicked}
    >
        {children}
    </button>
);

export default button;