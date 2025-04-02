import React from 'react';
import { Link } from "react-router-dom"

export function Button({onClickAction, className, children}) {
    return (
        <button onClick={onClickAction} 
        className={`block px-4 py-2 mx-2 rounded-lg text-center shadow-sm btn-primary ${className}`}>
            {children}
        </button>
    );
}

export function ButtonLink({link, onClickAction, className, children}) {
    return (
        <Link to={link} onClick={onClickAction} className={`block px-4 py-2 mx-2 rounded-lg text-center shadow-sm btn-primary ${className}`}>
            {children}
        </Link>
    );
}