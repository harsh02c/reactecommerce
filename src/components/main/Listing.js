import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/user/AuthService";
import CartService from "../../services/user/CartService";

import ProductService from "../../services/user/ProductService"; 
const Listing=()=>{
    let navigate = useNavigate(); 
    const [APIData, setAPIData] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [APICategoryData, setAPICategoryData] = useState([]);
    const [APISubCategoryData, setAPISubCategoryData] = useState([]);

    useEffect(() => {  
        // const product = { name: "", category: "", subCategory: ""  }; 
        const formData = new FormData();
        formData.append('name',"")
        // formData.append('category',product.category)
        // formData.append('subCategory',product.subcategory)
        ProductService.getProductListing(formData).then((response) => {
                setAPIData(response.data);
        }).catch(function (error) {
            // if (error.response) {
            //     console.log(error.response.data);
            //     console.log(error.response.status);
            //     console.log(error.response.headers);
            //     alert(error.response.data.message);
            // }
            localStorage.clear();
            navigate("/seller/sign-in"); 
        });

        ProductService.getCategory().then((response) => {
            setAPICategoryData(response.data);
        }).catch(function (error) {
            // if (error.response) {
            //     console.log(error.response.data);
            //     console.log(error.response.status);
            //     console.log(error.response.headers);
            //     alert(error.response.data.message);
            // }
            localStorage.clear();
            navigate("/seller/sign-in"); 
        });
    }, []);
    
    const redirectDetails=(id)=>{ 
        navigate("/product/details/"+id);
      }

    function loadSubCategory(){ 
        const category = document.getElementById("category").value
        ProductService.getSubCategory(category).then((response) => {
            setAPISubCategoryData(response.data);
        }).catch(function (error) {
            // if (error.response) {
            //     console.log(error.response.data);
            //     console.log(error.response.status);
            //     console.log(error.response.headers);
            //     alert(error.response.data.message);
            // }
            localStorage.clear();
            navigate("/seller/sign-in"); 
        }); 
    }

    const addToCart=(id)=>{ 
        if(!AuthService.getCurrentUser()){
            navigate("/product/sign-in")
        }

        const formData = new FormData();
        formData.append('userId',AuthService.getCurrentUser()._id)
        formData.append('productId',id)
        formData.append('quantity',1)

        CartService.addToCart(formData).then((response) => {
            alert("Product Added to cart")
        }).catch(function (error) {
            // if (error.response) {
            //     console.log(error.response.data);
            //     console.log(error.response.status);
            //     console.log(error.response.headers);
            //     alert(error.response.data.message);
            // }
            localStorage.clear();
            navigate("/product/sign-in")
        });
    }

    function searchMain(){
        var search = document.getElementById("search").value
        var category = document.getElementById("category").value
        var subcategory = document.getElementById("subcategory").value
        const formData = new FormData();
        formData.append('name',search)
        if(category!="all"){
            formData.append('category',category)
        }
        if(subcategory!="all"){
            formData.append('subCategory',subcategory)
        }
        // const product = { name: search, category: category, subCategory: subcategory  };
        ProductService.getProductListing(formData).then((response) => {
                setAPIData(response.data);
        }).catch(function (error) { 
            navigate("/product/sign-in"); 
          });
    }  
    function twoCalls(){
        searchMain()
        loadSubCategory()
    }
return(
    <>
        <section id="featured" className="my-5 py-5">
                <div className="container  py-5">
                    <div className="row">
                        <div className="col-lg-4 ">
                            <input className="form-control" id="search" placeholder="Search" onChange={searchMain} /> 
                        </div>
                        <div className="col-lg-4">
                            <select className="form-control" id="category"  onChange={twoCalls} >
                                <option value="all">Search Category</option>
                                {   
                                    APICategoryData.map(
                                        (data) => {  
                                            return(
                                                <option  key = {data._id} value={data._id}>{data.name}</option>
                                            )
                                        }    
                                    )
                                }
                            </select> 
                        </div>
                        <div className="col-lg-4">
                        <select className="form-control"  id="subcategory"  onChange={searchMain} >
                            <option value="all">Search SubCategory</option>
                            {   
                                APISubCategoryData.map(
                                    (data) => {  
                                        return(
                                            <option  key = {data._id} value={data._id}>{data.subname}</option>
                                        )
                                    }    
                                )
                            }
                        </select> 
                        </div>
                    </div>
                   
                    <h2 className="font-weight-bold">Our Products</h2><hr />
                    <p>Here you can check out our products with fair prices.</p>
                </div>
                <div className="row mx-auto container">
                {   
                    APIData.length>0 ? (
                        APIData.map(
                            (data) => {  
                                return(
                                        <div className="product text-center col-lg-3 col-md-4 col-12" id="product-div" key={data._id}  >
                                            {/* <img className="img-fluid mb-3" src="/assets/img/shop/1.jpg" alt="" onClick={ () =>  redirectDetails(data._id)}/> */}
                                            <img className="img-fluid mb-3" src={data.images} alt="" onClick={ () =>  redirectDetails(data._id)}/>
                                            <div className="start">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                            
                                            <h5 className="p-name" onClick={ () =>  redirectDetails(data._id)}>{data.name}</h5>
                                            <h4 className="p-price" >$ {data.price}</h4>
                                            <button className="buy-btn" onClick={()=>addToCart(data._id)}>Add to Cart</button>
                                        </div>
                                )
                            }
                        )
                    ):(
                        <h1>No Products available</h1>
                    )
                }
                  
                    {/* <nav aria-label="Page navigation example">
                        <ul className="pagination mt-5">
                            <li className="page-item "><a className="page-link" href="#">Previous</a></li>
                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                        </ul>
                    </nav> */}
                </div>
            </section>
    </>
)
}

export default Listing