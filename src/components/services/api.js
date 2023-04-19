import axios from "axios";

export const url = "http://localhost:3001/api";

export const setHeaders = () => {
  const headers = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  return headers;
};

// const apiKey= "AIzaSyDfSGq9pn2rOO_VgI9pMtW07f8LAv_kI28";

// const instance = axios.create({
//   baseURL: `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=10&orderBy=relevance&key=${apiKey}/api`,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default instance;

const BASE_URL = "http://localhost:3001/books";

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
    (response)=> {
        console.log('response interceptor', response)
        return response;
    },
    (error) => {
        console.log('response interceptor error', error);
        return Promise.reject(error)
    }
)

export const fetchData = async () =>{
    try{
        const response = await instance.get("http://localhost:3001/books");
        console.log('response data', response)
    }catch (error){
        console.log('request error', error )
    }
}
