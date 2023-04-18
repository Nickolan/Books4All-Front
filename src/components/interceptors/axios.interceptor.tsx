// import axios, { AxiosRequestConfig } from "axios";

// export const AxiosInterceptor = () =>{
//     const updateHeader = (request: AxiosRequestConfig) =>{
//         const token = '123456';
//         const newHeaders ={
//             Authorization: token,
//             'Content-Type': 'application/json',

            // The Authorization header is used for sending an access token for authentication purposes. The Content-Type header specifies the type of content being sent in the request body (in this case, JSON).
            
//         }
//         request.headers = newHeaders
//         return request;
//     }
//     axios.interceptors.request.use((request)=>{
//         if(request.url?.includes('assets')) return request;
//         return updateHeader(request);
//     });

//     axios.interceptors.response.use(
//         (response)=>{
//             console.log("response",response)
//             return response;
//         }, 
//         (error)=>{
//             console.log("error",error);
//             return Promise.reject(error)
//         }
//         )
    
// }