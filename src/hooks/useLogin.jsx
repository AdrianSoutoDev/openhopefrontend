import { useCallback, useContext, useEffect } from "react";
import useFetch from "./useFetch";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useLogin = () => {

    const { data, loading, fetch } = useFetch();
    const { login: setAuthLogin} = useContext(AuthContext);
    const navigate = useNavigate();
    
    const onSuccess = useCallback(data => {
        const token = data?.token
        if (token?.length) {
            setAuthLogin(token)
        }
        navigate("/");
    }, [setAuthLogin, navigate]);

    const login = (email, password) => {
        const endpoint = '/accounts/login'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        }
        
        fetch(endpoint, options)
    }

    useEffect(() => {
        if(data) onSuccess(data); 
    }, [data, onSuccess]);

    return { login, data, loading }
  };
  
  export default useLogin;