import { useContext, useState } from 'react';
import apiRequest, { handle4xxResponse, handleOkResponse, handleError } from '../services/apiFetchService';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import ErrorContext from '../context/ErrorContext';

const useFetch = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { showErrors } = useContext(ErrorContext);

    const navigate = useNavigate()

    const redirectToLoginPage = useCallback( (error) => {
        navigate('/login', {
            state: { msg: error }
        })
    }, [navigate]);

    const handleResponse = useCallback((response, onSuccess, onError) => {
        if (handleOkResponse(response, onSuccess)) return
        if (handle4xxResponse(response, onError, redirectToLoginPage)) return
        handleError(response, onError)
    }, [redirectToLoginPage]);

    const fetch = async (endpoint, options) => {
        setLoading(true)
        
        try {
            if(endpoint){
                const response = await apiRequest(endpoint, options)
                handleResponse(response, setData, showErrors)
            }
        } catch (err) {
            showErrors([err.message])
        } finally {
            setLoading(false)
        }
    };

    return { data, loading, fetch }
};

export default useFetch;