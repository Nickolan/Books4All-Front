import axios from "axios";

export const url = "http://localhost:3001/api/stripe";

export const setHeaders = () => {
  const headers = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  return headers;
};


const BASE_URL = "http://localhost:3001";

export const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

instance.interceptors.request.use(
    (request) =>{
        console.log('request interceptor', request)
        return request;
    },
    (error)=> {
        console.log('request interceptor', error);
        return Promise.reject(error)
    }

);

instance.interceptors.response.use(
    async (response)=> {
         console.log(' hresponse interceptor',  response)
        return response;
    },
    (error) => {
        console.log('response interceptor error', error);
        return Promise.reject(error)
    }
)