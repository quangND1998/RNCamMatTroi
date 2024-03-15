import { API_URL } from "@env"
import axios from "axios";
import { getToken, destroyToken } from "./asynStorage";
import { destroyTokenStorage } from "./managerStorage";

axios.defaults.headers[
    "Accept"
] = `application/json`;

axios.interceptors.request.use(async(request) => {

    const access_token = await getToken();

    const newHeaders = {
        ...request.headers,


        Authorization: `Bearer ${access_token}`,
    };

    // axios.defaults.httpsAgent = new https.Agent({
    //     rejectUnauthorized: false
    // });
    if (access_token) {

        request = {
            ...request,
            headers: newHeaders,
        };
    }

    return request;
});

axios.interceptors.response.use((response) => {
    // console.log(response)
    if (response.status == 200) {

    }
    return response
}, error => {

    // return Promise.reject(error)
    if (error.response) {

        if (error.response.status == 401) {
            destroyToken();
            destroyTokenStorage();


        }

        return Promise.reject(error)
    } else {
        return Promise.reject(error)
    }
})
const ApiService = {
    async setHeader() {

        axios.defaults.headers[
            "Authorization"
        ] = `Bearer ${token_value}`;
        axios.defaults.headers[
            "Accept"
        ] = `application/json`;


    },
    queryData(resource, params) {
        // console.log(jwtToken.getToken())
        // console.log(params)
        return axios.get(API_URL + "/" + resource, { params })
    },
    query(resource) {
        return axios.get(API_URL + "/" + resource)
    },

    get(resource, slug) {
        return axios.get(API_URL + "/" + resource + "/" + slug)
    },

    post(resource, params) {
        console.log('apiservice', API_URL + "/" + resource);
        return axios.post(API_URL + "/" + resource, params)
    },

    postFormData(resource, params, headers) {

        return axios.post(API_URL + "/" + resource, params, {
            headers
        })
    },

    update(resource, params, slug) {
        // console.log('apiservice_update', params);
        return axios.post(API_URL + "/" + resource + "/" + slug, params);
    },

    put(resource, params) {
        // console.log('apiservice_put', params);
        // console.log('apiservice_put', resource);
        return axios.put(API_URL + "/" + resource, params);
    },

    delete(resource) {
        return axios.delete(API_URL + "/" + resource)
    }
}
export default ApiService;