const getToken = () => {
   return localStorage.getItem("ACCESS_TOKEN");
 };
 
 const setToken = (token) => {
   localStorage.setItem("ACCESS_TOKEN", token);
 };
 
 const clearToken = () => {
   localStorage.clear();
 };
 
 export default {
   getToken,
   setToken,
   clearToken
 };