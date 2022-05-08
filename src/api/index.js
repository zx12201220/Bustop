import axios from "axios";
import store from "../store/index.js";

const apiRequest = axios.create({
    baseURL: "", //http://35.229.253.182/173cake/api/
});

apiRequest.interceptors.request.use(
    (confing) => {
        //攔截請求
        return confing;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

apiRequest.interceptors.response.use(
    (response) => {
        //攔截回應
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const apiOrderNumber = (data) => apiRequest.post("/orderNumber", data); //insertOrder.php