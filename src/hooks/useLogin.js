import { useEffect } from "react";
import { removeToken, setToken } from "../services/tokenService";
import useFetch from "./useFetch";

const useLogin = () => {
    const { data, error, loading, updateRequest } = useFetch();

    const login = (email, password) => {
        updateRequest('/accounts/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
    }

    useEffect(() => { 
        const processData = async () => {
            const status = data?.status;
            const jsonData = status === 200 ? await data.json() : removeToken();
            const token = jsonData?.token;

            if (token?.length) {
                setToken(token);
            }
        };

        processData();
    }, [data]);

    return { login, data, error, loading }
  };
  
  export default useLogin;