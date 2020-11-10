/**
 * Simple API class service for making Axios calls
 * and returning a promise for each call
 */
import axios from 'axios';
import 'lodash';

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] ='application/json';
// axios.defaults.withCredentials = true;

class Api {

    constructor() {
        this.base_url = this.getBaseUrl();
    }

    getBaseUrl() {
        let baseUrl = `${process.env.VUE_APP_API_BASE_URL}/api`;
        return baseUrl;
    }

    /**
     * Get
     * @param {string} endpoint
     * @param {*} params
     */
    get(endpoint, params = {}, headers = {}, responseType = 'json' ) {
        let config = {
            url: `${this.base_url}/${endpoint}`,
            params: params,
            method: 'GET',
            responseType: responseType,
        };

        if (!_.isEmpty(headers)){
            config['headers'] = headers;
        }

        return new Promise((resolve, reject) => {
            axios(config).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    }
    /**
     * Post
     * @param {string} endpoint
     * @param {*} data
     */
    post(endpoint, data = {}, headers = {}) {
        let config = {
            url: `${this.base_url}/${endpoint}`,
            data: data,
            method: 'POST',      
        };
        if (!_.isEmpty(headers)){
            config['headers'] = headers;
        }
        return new Promise((resolve, reject) => {
            axios(config).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * PUT
     * @param {string} endpoint
     * @param {*} data
     */
    put(endpoint, data = {}) {
        return new Promise((resolve, reject) => {
            axios({url:`${this.base_url}/${endpoint}`, data: data, method: 'PUT'}).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * Delete
     * @param {string} endpoint
     * @param {*} params
     */
    delete(endpoint, params = {}) {
        return new Promise((resolve, reject) => {
            axios({url: `${this.base_url}/${endpoint}`, params, method: 'DELETE' }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    }
}

export default new Api;
