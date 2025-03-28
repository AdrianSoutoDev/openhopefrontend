import React, { useContext, useEffect, useState } from 'react';
import useLogin from '../hooks/useLogin';
import { useLocation, useNavigate } from "react-router-dom"
import AuthContext from '../context/AuthContext';

function Login() {
    const { isAuthenticated } = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useLogin();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    useEffect( () => {
        if(isAuthenticated) navigate("/")
    }, [isAuthenticated, navigate])

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
            {error?.email && <p style={{ color: 'red' }}>{error?.email}</p>}
            {error?.message && <p style={{ color: 'red' }}>Error: {error?.message || 'Login fallido, por favor intente nuevamente.'}</p>}
            {location.state?.msg && <p style={{ color: 'red' }}>Error: {location.state?.msg.error || 'Login fallido, por favor intente nuevamente.'}</p>}
        </>
    );
}

export default Login