import React from 'react'
import { Link } from 'react-router-dom'

export function Button({ onClick, className, type, disabled, children }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`font-semibold block rounded-lg text-center shadow-sm btn-primary border px-4 py-2 cursor-pointer 
                disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:text-gray-600 disabled:cursor-default
              disabled:hover:text-gray-600 disabled:border-gray-600 
                ${className}`}
    >
      {children}
    </button>
  )
}

export function ButtonLink({ link, onClick, className, children }) {
  return (
    <Link
      to={link}
      onClick={onClick}
      className={`font-semibold block rounded-lg text-center shadow-sm btn-primary border px-4 py-2 ${className}`}
    >
      {children}
    </Link>
  )
}
