import { useState, useEffect } from 'react';
import apiRequest from '../services/apiFetchService';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const useFetch = (initialEndpoint, initialOptions) => {
    const [requestConfig, setRequestConfig] = useState({ endpoint: initialEndpoint, options: initialOptions });
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    const handleResponse = useCallback((response) => {
        if (response.status === 401) {
            navigate("/login");
            return;
        }
    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError(null)
            setData(null)
            try {
                const result = await apiRequest(requestConfig.endpoint, requestConfig.options)
                handleResponse(result)
                setData(result)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        };

        if(requestConfig.endpoint) fetchData()
    }, [requestConfig, navigate, handleResponse]);

    const updateRequest = (endpoint, options) => {
        setRequestConfig({ endpoint, options })
    }

    return { data, loading, error, updateRequest }
};

export default useFetch;