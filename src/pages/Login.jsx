import React, { useContext, useEffect } from 'react';
import useLogin from '../hooks/useLogin';
import { useLocation, useNavigate } from "react-router-dom"
import AuthContext from '../context/AuthContext';
import { FormattedMessage } from 'react-intl';
import { Button } from '../components/shared/Buttons'
import useValidation from '../hooks/useValidation';

function Login() {
    const { isAuthenticated } = useContext(AuthContext)
    const { login, loading } = useLogin();
    const navigate = useNavigate();
    const location = useLocation();

    const emailValidation = useValidation("", {
        required: true,
        format: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
        messages: {
          required: <FormattedMessage id="email_error_empty" />,
          format: <FormattedMessage id="email_error_format" />,
        },
    });
    
    const passwordValidation = useValidation("", {
        required: true,
        messages: {
          required: <FormattedMessage id="password_error_empty" />,
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        const isEmailValid = emailValidation.validate()
        const isPasswordValid = passwordValidation.validate()

        if (isEmailValid && isPasswordValid) {
            login(emailValidation.value, passwordValidation.value)
        }
    };

    useEffect( () => {
        if(isAuthenticated) navigate("/")
    }, [isAuthenticated, navigate])

    useEffect( () => {
        navigate(location.pathname, { replace: true })
    }, [emailValidation.value, passwordValidation.value, location.pathname, navigate])

    return (
        <>
        <div className='flex h-96 justify-center items-center'>
            <div className='flex-col items-end rounded-lg shadow-sm border border-secondary w-2/3 max-w-96 h-fit p-4'>
                <form onSubmit={handleSubmit}>

                    <label htmlFor="email"><FormattedMessage id='email' className='text-secondary'/></label>
                    <input 
                        type="email" 
                        id="email" 
                        value={emailValidation.value} 
                        onChange={emailValidation.handleChange} 
                        required 
                        onInvalid={emailValidation.onInvalid}
                        className='rounded-lg shadow-sm border input-primary w-full px-4 py-2 my-2'/>
                        { emailValidation.error &&
                            <p className="text-danger mb-2">{emailValidation.error}</p>
                        }

                    <label htmlFor="password"><FormattedMessage id='password' className='text-secondary'/></label>
                    <input 
                        type="password" 
                        id="password" 
                        value={passwordValidation.value} 
                        onChange={passwordValidation.handleChange} 
                        required
                        onInvalid={passwordValidation.onInvalid}
                        className='rounded-lg shadow-sm border input-primary w-full px-4 py-2 my-2'/>   
                    { passwordValidation.error &&
                        <p className="text-danger mb-2">{passwordValidation.error}</p>
                    }

                    <Button type="submit" disabled={loading} className="w-full px-4 py-2 my-2 cursor-pointer">
                        <FormattedMessage id='signin' />
                    </Button>

                    {location.state?.msg && 
                        <p className="text-danger">{location.state?.msg.error || 'Invalid credentials'}</p>
                    }
                </form>
             </div>
        </div>
        </>
    );
}

export default Login