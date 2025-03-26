import { useContext, useEffect } from "react";
import useFetch from "./useFetch";
import AuthContext from "../context/AuthContext";

const useLogin = () => {
    const { data, error, loading, updateRequest } = useFetch();
    const { login: setAuthLogin, logout: setAuthLogout } = useContext(AuthContext);
    
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
            const status = data?.status

            if(status == 200) {
                const jsonData = await data?.clone().json();
                const token = jsonData?.token

                if (token?.length) {
                    setAuthLogin(token)
                }
            } 
        };

        processData();
    }, [data, setAuthLogin, setAuthLogout]);

    return { login, data, error, loading }
  };
  
  export default useLogin;