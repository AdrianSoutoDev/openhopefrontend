import { useState } from 'react';
import apiRequest, { handle4xxResponse, handleOkResponse } from '../services/apiFetchService';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const useFetch = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    const redirectToLoginPage = useCallback( (error) => {
        navigate('/login', {
            state: { msg: error }
        })
    }, [navigate]);

    const handleResponse = useCallback((response, onSuccess, onError) => {
        if (handleOkResponse(response, onSuccess)) return
        if (handle4xxResponse(response, onError, redirectToLoginPage)) return
        //TODO: Error handler
    }, [redirectToLoginPage]);

    const fetch = async (endpoint, options) => {
        setLoading(true)
        setError(null)
        
        try {
            if(endpoint){
                const response = await apiRequest(endpoint, options)
                handleResponse(response, setData, setError)
            } else {
                //TODO: Error, not endpoint
            }
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    };

    return { data, loading, error, fetch }
};

export default useFetch;