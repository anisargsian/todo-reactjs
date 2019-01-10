import React from "react";

const list = ({ id, children }) => (
    <ul id={id}>
        {children}
    </ul>
);

export default list;