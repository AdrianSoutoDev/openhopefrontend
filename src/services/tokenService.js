const getToken = () => sessionStorage.getItem('token');
const setToken = (token) => sessionStorage.setItem('token', token);
const removeToken = () => sessionStorage.removeItem('token');

export { getToken, setToken, removeToken };