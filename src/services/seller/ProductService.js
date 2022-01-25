import axios from 'axios';
import authHeader from "./AuthHeader";
import AuthService from './AuthService';
// const PRODUCT_API_BASE_URL = "http://localhost:9080/ecommerce-product/product";
// const CATEGORY_API_BASE_URL = "http://localhost:9080/ecommerce-product/category";
const PRODUCT_API_BASE_URL  = "http://ecommercecloudgateway-env.eba-qatjii2u.us-east-1.elasticbeanstalk.com/ecommerce-product/product";
const CATEGORY_API_BASE_URL = "http://ecommercecloudgateway-env.eba-qatjii2u.us-east-1.elasticbeanstalk.com/ecommerce-product/category";

class ProductService{
    
    getProductListing(product){
        return axios.post(PRODUCT_API_BASE_URL+'/getAllProduct',product, { headers: authHeader()  });
    }

    getCategory(){
        return axios.get(CATEGORY_API_BASE_URL+'/getAllCategory',  { headers: authHeader()  });
    }

    getSubCategory(category){
        return axios.get(CATEGORY_API_BASE_URL+'/getAllSubCategory/'+category,  { headers: authHeader()  });
    }

    getSellerProductListing(product){
        const sellerId = AuthService.getCurrentSeller()._id;
        return axios.get(PRODUCT_API_BASE_URL+'/getSellerProduct/'+sellerId, { headers: authHeader()  });
    }

    getProductDetails(product){
        return axios.get(PRODUCT_API_BASE_URL+'/getProductById/'+product, { headers: authHeader() });
    }

    addProduct(product){
        // const sellerId = AuthService.getCurrentSeller()._id;
        // const formData = new FormData();
        // formData.append('name',product.name)
        // formData.append('category',product.category)
        // formData.append('subCategory',product.subcategory)
        // formData.append('price',parseFloat(product.price))
        // formData.append('description',product.description)
        // formData.append('seller',sellerId)
        // const blob = new Blob([product.images], {type: product.images.type});
        // formData.append('images',blob)
        // formData.append('images',image_as_files)
       
        // formData.append('price',parking.price)
        // formData.append('totalslots',parking.totalslots)
        // formData.append('availableslots',parking.availableslots)
    
        // formData.append('user', JSON.stringify(parking.user))
        // return axios.post(PRODUCT_API_BASE_URL+'/addParking',parking, { headers: authHeader() });
        return axios.post(PRODUCT_API_BASE_URL+'/addProduct',product, { headers: authHeader()  } );
    }
    
    editProduct(product,productId){ 
        // const sellerId = AuthService.getCurrentSeller()._id;
        // const formData = new FormData();
        // formData.append('name',product.name)
        // formData.append('category',product.category)
        // formData.append('subCategory',product.subCategory)
        // formData.append('price',parseFloat(product.price))
        // formData.append('description',product.description)
        // formData.append('seller',sellerId)
        // formData.append('seller',sellerId)
        // if(product.images!=null){
        //     // const blob = new Blob([product.images], {type: product.images.type}); 
        //     const blob = new Blob([product.images], {type: product.images.type}); 
        //     formData.append('images',blob)
        // }else{
        //     formData.append('images',null)
        // }
        // let reader = new FileReader();
        // let file = e.target.files[0];
        // return false;
        return axios.put(PRODUCT_API_BASE_URL+'/updateProduct/'+productId,product, { headers: authHeader() });
    }

    uploadImages(product,id){
        return axios.post(PRODUCT_API_BASE_URL+'/addImages/'+id,product, { headers: authHeader() });
    }

    deleteProduct(product){ 
        return axios.delete(PRODUCT_API_BASE_URL+'/deleteById/'+product, { headers: authHeader() });
    }
}

export default new ProductService();