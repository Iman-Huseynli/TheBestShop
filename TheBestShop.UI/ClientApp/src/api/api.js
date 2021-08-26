import axios from 'axios'


const url = 'https://localhost:44332/api/';

const authToken = 'thebestshopauth';

export const setAuthToken = (data) => localStorage.setItem(authToken, JSON.stringify(data)); 
export const getAuthToken = () => JSON.parse(localStorage.getItem(authToken)); 
export const removeAuthToken = () => localStorage.removeItem(authToken); 

export const getData = (actions, config) => axios.get(`${url}${actions}`, config);
export const getById = (actions, id, config) => axios.get(`${url}${actions}?id=${id}`, config);
export const postData = (actions, data, config) => axios.post(`${url}${actions}`, data, config);