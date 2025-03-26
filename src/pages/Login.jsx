import React, { useContext, useEffect, useState } from 'react';
import useLogin from '../hooks/useLogin';
import { useNavigate } from "react-router-dom"
import AuthContext from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, data, error } = useLogin();
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext)

    if(isAuthenticated) navigate("/")

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    useEffect(() => {
      if(data?.status === 200){
        navigate("/");
      }

      if(error){
        console.log(error)
      }
    }, [data, error, navigate]);

    return (
        <>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>Error: {error?.message || 'Login fallido, por favor intente nuevamente.'}</p>}
            {!error && data && data.status !== 200 && <p style={{ color: 'red' }}>Error: {error?.message || 'Login fallido, por favor intente nuevamente.'}</p>}
            {!error && data && data.status === 200 && (
                <p style={{ color: 'green' }}>Login exitoso</p>
            )}
        </>
    );
}

export default Login