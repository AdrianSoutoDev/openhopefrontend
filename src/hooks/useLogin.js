import { useCallback, useContext } from "react";
import useFetch from "./useFetch";
import AuthContext from "../context/AuthContext";

const useLogin = () => {

    const { data, error, loading, updateRequest} = useFetch();
    const { login: setAuthLogin} = useContext(AuthContext);
    
    const onSuccess = useCallback(data => {
        console.log("onSuccess")
        const token = data?.token

        if (token?.length) {
            setAuthLogin(token)
        }
    }, [setAuthLogin]);

    const login = (email, password) => {
        updateRequest('/accounts/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        }, onSuccess)
    }

    return { login, data, error, loading }
  };
  
  export default useLogin;