import axios from 'axios';
// const AUTH_API_BASE_URL = "http://localhost:9080/ecommerce-auth";
const AUTH_API_BASE_URL = "http://ecommercecloudgateway-env.eba-qatjii2u.us-east-1.elasticbeanstalk.com/ecommerce-auth";

class AuthService{
    registerUser(user){
        return axios.post(AUTH_API_BASE_URL+'/uesr/signup',user);
    }

    loginUser(user){
        return axios.post(AUTH_API_BASE_URL+'/user/login',user);
    }

    registerSeller(user){
        return axios.post(AUTH_API_BASE_URL+'/seller/signup',user);
    }

    loginSeller(user){
        return axios.post(AUTH_API_BASE_URL+'/seller/login',user);
    }


    logoutUser() { 
        localStorage.removeItem('userData');
        localStorage.removeItem('userToken');
        localStorage.removeItem('userId');
    }

    logoutSeller() { 
        localStorage.removeItem('sellerData');
        localStorage.removeItem('sellerToken');
        localStorage.removeItem('sellerId');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('userData'));
    }

    getCurrentSeller() {
        return JSON.parse(localStorage.getItem('sellerData'));
    }
}

export default new AuthService();