import React from "react";

const input = ({ id, onBlur }) => (
    <input 
        type="text" 
        id={id} 
        onBlur = {onBlur}
    />
);

export default input;