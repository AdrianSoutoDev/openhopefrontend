import { useState, useEffect } from 'react';
import apiRequest from '../services/apiFetchService';

const useFetch = (initialEndpoint, initialOptions) => {
    const [requestConfig, setRequestConfig] = useState({ endpoint: initialEndpoint, options: initialOptions });
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError(null)
            try {
                const result = await apiRequest(requestConfig.endpoint, requestConfig.options);
                setData(result);
            } catch (err) {
                 setError(err);
            } finally {
                setLoading(false);
            }
        };

        if(requestConfig.endpoint) fetchData()
        
    }, [requestConfig]);

    const updateRequest = (endpoint, options) => {
        setRequestConfig({ endpoint, options })
    }

    return { data, loading, error, updateRequest }
};

export default useFetch;