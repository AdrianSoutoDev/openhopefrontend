import React, { useContext } from 'react';
import ErrorContext from '../../context/ErrorContext';

const ErrorMessage = () => {
  const { error } = useContext(ErrorContext);

  if (!error) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      padding: '10px 20px',
      backgroundColor: 'red',
      color: 'white',
      borderRadius: '5px',
      zIndex: 1000,
    }}>
      {error}
    </div>
  );
};

export default ErrorMessage;