import React from 'react';
import { Link } from "react-router-dom"

export function Button({onClickAction, className, type, disabled, children}) {
    return (
        <button type={type} disabled={disabled} onClick={onClickAction} 
            className={`block rounded-lg text-center shadow-sm btn-primary border px-4 py-2 cursor-pointer ${className}`}>
            {children}
        </button>
    );
}

export function ButtonLink({link, onClickAction, className, children}) {
    return (
        <Link to={link} onClick={onClickAction} className={`block rounded-lg text-center shadow-sm btn-primary border px-4 py-2 ${className}`}>
            {children}
        </Link>
    );
}