import React, { createContext, useState } from 'react';

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const showError = (message) => {

    if (message && typeof message === 'string' && message.length){
      setError(message);
      setTimeout(() => {
        setError(null);
      }, 5000);
    } else if (message && typeof message === 'object')
      if(Object.values(message)[0] && Object.values(message)[0].length){
        setError(Object.values(message)[0]);
        setTimeout(() => {
          setError(null);
        }, 5000);
    }
  };

  return (
    <ErrorContext.Provider value={{ error, showError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorContext