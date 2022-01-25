import React, { useEffect,useState }  from "react";
import { useNavigate ,useParams} from "react-router-dom";
import AuthService from "../../services/user/AuthService";
import CartService from "../../services/user/CartService";
import ProductService from "../../services/user/ProductService";

const Details=()=>{
    const navigate = useNavigate(); 

    const [APIDataDetails, setAPIDataDetails] = useState([]);

    let { id } = useParams();
    useEffect(() => { 
        ProductService.getProductDetails(id).then((response) => {
            setAPIDataDetails(response.data); 
        }).catch(function (error) {
            // if (error.response) {
            //     console.log(error.response.data);
            //     console.log(error.response.status);
            //     console.log(error.response.headers);
            //     alert(error.response.data.message);
            // }
            // navigate("../sign-in", { replace: true }); 
            // navigate("/product/sign-in"); 
        });
    }, []);
    function slider(){
        var MainImg = document.getElementById("MainImg");
        var smallimg = document.getElementsByClassName("small-img");

        smallimg[0].onclick = function(){
            MainImg.src = smallimg[0].src;
        }
        smallimg[1].onclick = function(){
            MainImg.src = smallimg[1].src;
        }
        smallimg[2].onclick = function(){
            MainImg.src = smallimg[2].src;
        }
        smallimg[3].onclick = function(){
            MainImg.src = smallimg[3].src;
        } 
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
    return (
        <>
            <section className="container sproduct my-5 pt-5">
                <div className="row mt-5">
                    <div className="col-lg-5 col-md-12 col-12">
                        <img id="MainImg" className="img-fluid w-100 pb-1" src={APIDataDetails.images} alt="" />
                        {/* Below code is for multiple images Slider effect */}
                        {/* <div className="small-img-group" onClick={slider}>
                            <div className="small-img-col">
                                <img src="/assets/img/shop/1.jpg" width="100%" className="small-img" alt=""/>
                            </div>
                            <div className="small-img-col">
                                <img src="/assets/img/shop/2.jpg" width="100%" className="small-img" alt=""/>
                            </div>
                            <div className="small-img-col">
                                <img src="/assets/img/shop/3.jpg" width="100%" className="small-img" alt=""/>
                            </div>
                            <div className="small-img-col">
                                <img src="/assets/img/shop/4.jpg" width="100%" className="small-img" alt=""/>
                            </div>
                        </div> */}
                    </div>
                    <div className="col-lg-6 col-md-12 col-12">
                        <h6>Home/T-shirt</h6>
                        <h3 className="py-4"> {APIDataDetails.name}</h3>
                        <h2>$ {APIDataDetails.price}</h2>
                        {/* <select className="my-3">
                            <option>Select Size</option>
                            <option>XL</option>
                            <option>XXL</option>
                            <option>S</option>
                            <option>L</option>
                        </select> */}
                        <h5>Category: {APIDataDetails.name?APIDataDetails.category.name:""}</h5>
                        <h5>Sub Category: {APIDataDetails.name?APIDataDetails.subCategory.subname:""}</h5>
                        {/* <input  type="number" value="1" /> */}
                        <button className="buy-btn" onClick={()=>addToCart(APIDataDetails._id)}>Add to Cart</button>
                        <h4 className="mt-5 mb-5">Product Details</h4>
                        <span>{ APIDataDetails.description}</span>

                    </div>
                </div> 
            </section>
            <section id="featured" className="my-5 pb-5">
                <div className="container text-center mt-5 py-5">
                    <h3>Related Products</h3><hr className="mx-auto"/>
                </div>
                <div className="row mx-auto container-fluid">
                    <div className="product text-center col-lg-3 col-md-4 col-12">
                        <img className="img-fluid mb-3" src="/assets/img/featured/1.jpg" alt=""/>
                        <div className="start">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                        <h5 className="p-name">Sport Boots</h5>
                        <h4 className="p-price" >$200</h4>
                        <button className="buy-btn">Buy Now</button>
                    </div>
                    <div className="product text-center col-lg-3 col-md-4 col-12">
                        <img className="img-fluid mb-3" src="/assets/img/featured/2.jpg" alt=""/>
                        <div className="start">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                        <h5 className="p-name">Sport Boots</h5>
                        <h4 className="p-price" >$200</h4>
                        <button className="buy-btn">Buy Now</button>
                    </div>
                    <div className="product text-center col-lg-3 col-md-4 col-12">
                        <img className="img-fluid mb-3" src="/assets/img/featured/3.jpg" alt=""/>
                        <div className="start">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                        <h5 className="p-name">Sport Boots</h5>
                        <h4 className="p-price" >$200</h4>
                        <button className="buy-btn">Buy Now</button>
                    </div>
                    <div className="product text-center col-lg-3 col-md-4 col-12">
                        <img className="img-fluid mb-3" src="/assets/img/featured/4.jpg" alt=""/>
                        <div className="start">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                        <h5 className="p-name">Sport Boots</h5>
                        <h4 className="p-price" >$200</h4>
                        <button className="buy-btn">Buy Now</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Details 