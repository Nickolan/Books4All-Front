import { instance, setHeaders } from "./api";
import TokenService from "./token.service";

//config trae la información del token

const setup = (store) => {
  instance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        config.headers["x-access-token"] = token; // for Node.js Express back-end
      }
      setHeaders();
      console.log(token);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
export default setup;
