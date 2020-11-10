import api from './api.js';

class Auth {
    constructor() {
        this.url_login         = 'account/login';
        this.url_logout        = 'account/logout';
        this.url_current_user  = 'account/users/current';
    }

    login(data){
        return api.post(this.url_login, data, {'Content-Type': 'application/x-www-form-urlencoded'});
    }

    logout(){
        return api.delete(this.url_logout,{});
    }

    currentUser(){
        return api.get(this.url_current_user);
    }


}

export default new Auth;
