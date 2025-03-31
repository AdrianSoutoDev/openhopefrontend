import React, { useContext, useEffect, useState } from 'react';
import useLogin from '../hooks/useLogin';
import { useLocation, useNavigate } from "react-router-dom"
import AuthContext from '../context/AuthContext';
import { FormattedMessage } from 'react-intl';

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

    useEffect( () => {
        navigate(location.pathname, { replace: true })
    }, [email, password, location.pathname, navigate])

    return (
        <>
            <h1><FormattedMessage id='login_title' /></h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email"><FormattedMessage id='email' />:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password"><FormattedMessage id='password' />:</label>
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
            {error?.message && <p style={{ color: 'red' }}>Error: {error?.message || <FormattedMessage id='login_fail' /> }</p>}
            {location.state?.msg && <p style={{ color: 'red' }}>Error: {location.state?.msg.error || <FormattedMessage id='login_fail' />}</p>}
        </>
    );
}

export default Login