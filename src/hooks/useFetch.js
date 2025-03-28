import { useState, useEffect } from 'react';
import apiRequest, { handle4xxResponse, handleOkResponse } from '../services/apiFetchService';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const useFetch = (initialEndpoint, initialOptions, initialOnSuccess, initialOnError) => {
    const [requestConfig, setRequestConfig] = useState({ endpoint: initialEndpoint, options: initialOptions, onSuccess: initialOnSuccess, onError: initialOnError });
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    const redirectToLoginPage = useCallback(() => {
        navigate("/login");
    }, [navigate]);

    const handleResponse = useCallback((response, onSuccess, onError) => {
        if (handleOkResponse(response, onSuccess)) return
        if (handle4xxResponse(response, onError, redirectToLoginPage)) return
    }, [redirectToLoginPage]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError(null)
            setData(null)

            try {
                const response = await apiRequest(requestConfig.endpoint, requestConfig.options)
                handleResponse(response, requestConfig.onSuccess, requestConfig.onError)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        };

        if(requestConfig.endpoint) fetchData()
    }, [requestConfig, navigate, handleResponse, requestConfig.onSuccess, requestConfig.onError]);

    const updateRequest = (endpoint, options, onSuccess, onError) => {
        setRequestConfig({ endpoint, options, onSuccess, onError })
    }

    return { data, loading, error, updateRequest }
};

export default useFetch;