import axios from 'axios';
import authHeader from "./AuthHeader"; 
// const PRODUCT_API_BASE_URL = "http://localhost:9080/ecommerce-product/product";
// const CATEGORY_API_BASE_URL = "http://localhost:9080/ecommerce-product/category"; 
const PRODUCT_API_BASE_URL = "http://ecommercecloudgateway-env.eba-qatjii2u.us-east-1.elasticbeanstalk.com/ecommerce-product/product";
const CATEGORY_API_BASE_URL = "http://ecommercecloudgateway-env.eba-qatjii2u.us-east-1.elasticbeanstalk.com/ecommerce-product/category"; 

class ProductService{
    
    getProductListing(product){
        return axios.post(PRODUCT_API_BASE_URL+'/getAllProduct',product, { headers: authHeader()  });
        // return axios.post(PRODUCT_API_BASE_URL+'/getAllProduct',product);
    }

    getCategory(){
        return axios.get(CATEGORY_API_BASE_URL+'/getAllCategory',  { headers: authHeader()  });
    }

    getSubCategory(category){
        return axios.get(CATEGORY_API_BASE_URL+'/getAllSubCategory/'+category,  { headers: authHeader()  });
    }

   

    getProductDetails(product){
        return axios.get(PRODUCT_API_BASE_URL+'/getProductById/'+product, { headers: authHeader() });
    }

    deleteProduct(product){ 
        return axios.delete(PRODUCT_API_BASE_URL+'/deleteById/'+product, { headers: authHeader() });
    }
}

export default new ProductService();