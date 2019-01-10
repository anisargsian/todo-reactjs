import React from "react";

const form = ({ action, children }) => (
    <form action={action}>
        {children}
    </form>
);

export default form;