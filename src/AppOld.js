import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
// import "./assets/css/plugins.css";
// import "./assets/css/style.css";
// import "./assets/css/responsive.css";
import {Helmet} from "react-helmet";   //used to add meta tag in react https://github.com/nfl/react-helmet
import SellerHeader from './components/seller/SellerHeader'; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SellerProductListing from './components/seller/SellerProductListing';
import AddProduct from './components/seller/AddProduct';
import EditProduct from './components/seller/EditProduct';
import ProductDetails from './components/seller/ProductDetails';
import SellerLogin from './components/seller/SellerLogin';
import SellerRegister from './components/seller/SellerRegister';
import ProductListing from './components/main/ProductListing';
function App() {
  return (
    <div className="App">
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Helmet>
      <SellerHeader/>
      <div className="outer">
        <Routes> 
              {/* <Route exact path='/' element={<ParkingListing/>}  /> */}
          <Route exact path='/product'>
            <Route  path='listing' element={<ProductListing/>}  /> 
          </Route>
          <Route exact path='/seller'>
            <Route  path='seller-products' element={<SellerProductListing/>}  />
            <Route path="sign-in" element={<SellerLogin/>} />
            <Route path="register" element={<SellerRegister/>} />
            <Route path="add-product" element={<AddProduct/>} />
            <Route path="edit-product/:id" element={<EditProduct/>} />
            <Route path="product-details/:id" element={<ProductDetails/>} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
