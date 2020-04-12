import axios from 'axios';
export const api = axios
  .get('https://reqres.in/api/users?page=1')
  .then(function(response) {
    return response.data;
  })
  
export const getUser = () => {
  return api;
};