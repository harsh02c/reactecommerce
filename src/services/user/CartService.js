import axios from 'axios';
import authHeader from "./AuthHeader"; 
import AuthService from './AuthService';
// const CART_API_BASE_URL = "http://localhost:9080/ecommerce-checkout"; 
const CART_API_BASE_URL = "http://ecommercecloudgateway-env.eba-qatjii2u.us-east-1.elasticbeanstalk.com/ecommerce-checkout";

class CartService{
    
    getCartListing(){
        const userId = AuthService.getCurrentUser()._id;
        return axios.get(CART_API_BASE_URL+'/cart/getCart/'+userId, { headers: authHeader() });
    }

    addToCart(cart){
        return axios.post(CART_API_BASE_URL+'/cart/addToCart',cart, { headers: authHeader() });
    }

    createOrder(){
        const userId = AuthService.getCurrentUser()._id;
        return axios.get(CART_API_BASE_URL+'/checkout/createOrder/'+userId, { headers: authHeader() });
    }

    deleteCart(cart){ 
        return axios.delete(CART_API_BASE_URL+'/cart/deleteById/'+cart, { headers: authHeader() });
    }
}

export default new CartService();