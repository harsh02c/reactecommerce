// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
// if(window.location.pathname.includes("/product")){
  // import "./index.css"; 
// }
 
import SellerHeader from './components/seller/SellerHeader'; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SellerProductListing from './components/seller/SellerProductListing';
import AddProduct from './components/seller/AddProduct';
import EditProduct from './components/seller/EditProduct';
import ProductDetails from './components/seller/ProductDetails';
import SellerLogin from './components/seller/SellerLogin';
import SellerRegister from './components/seller/SellerRegister';
import ProductListing from './components/main/Home';
import Header from './components/main/Header';
import Footer from './components/main/Footer';
import Home from './components/main/Home';
import Listing from './components/main/Listing';
import Details from './components/main/Details';
import Cart from './components/main/Cart';
import Login from './components/main/Login';
import Register from './components/main/Register';
function App() {
  
  if(window.location.pathname.includes("/product")){
    return (
      <>
       <Header/>
       <Routes> 
          <Route exact path='/product'>
            <Route  path='home' element={<Home/>}  /> 
            <Route  path='listing' element={<Listing/>}  /> 
            <Route  path='details/:id' element={<Details/>}  /> 
            <Route  path='cart' element={<Cart/>}  /> 
            <Route  path='sign-in' element={<Login/>}  /> 
            <Route  path='register' element={<Register/>}  /> 
          </Route>
        </Routes>  
        <Footer/>
      </>
    );
  }else{ 
    
  return (
    <> 
      <SellerHeader/> 
        <Routes>  
              {/* <Route exact path='/' element={<ParkingListing/>}  /> */} 
          <Route exact path='/seller'>
            <Route  path='seller-products' element={<SellerProductListing/>}  />
            <Route path="sign-in" element={<SellerLogin/>} />
            <Route path="register" element={<SellerRegister/>} />
            <Route path="add-product" element={<AddProduct/>} />
            <Route path="edit-product/:id" element={<EditProduct/>} />
            <Route path="product-details/:id" element={<ProductDetails/>} />
          </Route>
        </Routes>
        <Footer/>
      </> 
    
  );
  
}
}

export default App;
