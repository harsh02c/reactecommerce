import React,{useState,useEffect} from "react";
import {  Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/seller/AuthService";
const SellerHeader=()=>{
    let navigate = useNavigate();
    const [currentSeller, setCurrentSeller] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentSeller();
         
        if (user) {
            setCurrentSeller(user); 
        }
    }, []);

    function Logout(){
        localStorage.clear();
        SellerHeader.render()
    }

    function redirectMain(){
        // navigate("/product/listing");
        window.location = "/product/listing";
    }

    return ( 
            <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 fixed-top">
                <div className="container">
                <div className="navbar-brand ecom-logo" onClick={redirectMain}><span>EcommerceApp</span></div>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">

                        {  currentSeller ? (
                            
                            <div className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/seller/seller-products"} ><span>My Products</span></Link>
                                </li> 
                                <li className="nav-item">
                                    {/* <Link className="nav-link" to={"/sign-in"} onClick={Logout}><span>Logout</span></Link> */}
                                    <Link className="nav-link" to={"/seller/sign-in"} onClick={Logout}><span>Logout</span></Link>
                                    {/* <a className="nav-link" onClick={Logout}><span>Logout</span></a> */}
                                </li>
                              
                            </div>
                            ) : (
                            <div className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/seller/sign-in"}><span>Sign in</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/seller/register"}><span>Register</span></Link>
                                </li>
                            </div>
                            )}
                        </ul>
                    </div>
                </div>
            </nav> 
    );
}
export default SellerHeader;