import React,{useState,useEffect} from "react";
import { useNavigate ,useParams} from "react-router-dom";
import AuthService from "../../services/user/AuthService";

const Header=()=>{
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
      const user = AuthService.getCurrentUser(); 
      if (user) {
          setCurrentUser(user); 
      }
  }, []);
  function redirectListing(){
      navigate("/product/listing");
  }
  function redirectHome(){
    navigate("/product/home");
  }
  function redirectCart(){
    navigate("/product/cart");
  }
  function redirectLogin(){
    navigate("/product/sign-in");
  }
  function redirectRegister(){
    navigate("/product/register");
  }
  function Logout(){
    localStorage.clear();
    // Header.render();
    window.location.href ="/product/sign-in"
  }
  function redirectSeller(){
    window.location = "/seller/sign-in";
  }

  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 fixed-top">
      <div className="container">
      {/* <a class="navbar-brand" href="javascript:void(0)">Navbar</a> */}
        {/* <img src="../../assets/img/logo1.png" alt=""/> */}
        <div className="navbar-brand ecom-logo" ><span>EcommerceApp</span></div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span  ><i id="bar" className="fas fa-bars"></i></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav  ml-auto">
        
            <li className="nav-item">
              <a className="nav-link" href="javascript:void(0)" onClick={redirectHome}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="javascript:void(0)" onClick={redirectListing}>Shop</a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="javascript:void(0)">Blog</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="javascript:void(0)">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="javascript:void(0)">Contact Us</a>
            </li> */}
            {  currentUser ? (
                    <>
                      <li className="nav-item">
                      {/* <i className="fal fa-search"></i> */}
                      <i className="fal fa-shopping-bag" onClick={redirectCart}></i>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link"  href="javascript:void(0)" onClick={Logout}>Logout</a>
                      </li>
                    </>
            ) : (
                    <>
                      <li className="nav-item">
                        <a className="nav-link" href="javascript:void(0)" onClick={redirectLogin}>Login</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="javascript:void(0)" onClick={redirectRegister}>Register</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="javascript:void(0)" onClick={redirectSeller}>Are you a Seller?</a>
                      </li> 
                    </>
            )}
            
          </ul> 
        </div>
      </div>
    </nav> 
  )
}

export default Header;