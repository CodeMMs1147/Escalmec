import axios from "axios";

export const registerRequest = async (user) =>
  axios.post(`${process.env.REACT_APP_BASE_URL}/auth/register`, user); 

export const loginRequest = async (user) => axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, user);

export const verifyTokenRequest = async () => axios.get(`${process.env.REACT_APP_BASE_URL}/auth/verify`);