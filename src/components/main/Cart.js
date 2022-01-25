import React, { useEffect,useState }   from "react";
import { useNavigate ,useParams} from "react-router-dom";
import AuthService from "../../services/user/AuthService";
import CartService from "../../services/user/CartService";

const Cart=()=>{
    const navigate = useNavigate();  
    const [APIData, setAPIData] = useState([]);
    // const [sum, setSum] = useState(0);
    useEffect(() => { 

        if(!AuthService.getCurrentUser()){
            navigate("/product/sign-in")
        } 
       CartService.getCartListing().then((response) => { 
            setAPIData(response.data); 
            var i;
            var sumTotal = 0;

            // APIData.forEach(value => {
            //     sumTotal +=  value.totalPrice;
            // }); 
            // setSum(sumTotal)
        }).catch(function (error) {
            alert(error)
            // if (error.response) {
            //     console.log(error.response.data);
            //     console.log(error.response.status);
            //     console.log(error.response.headers);
            //     alert(error.response.data.message);
            // }
            localStorage.clear();
            navigate("/product/sign-in"); 
        });
    }, []);  
    function createOrder(){
        CartService.createOrder().then((response) => {
            getData()
            alert("Mail sent to sellers")
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

    function deleteCartValue(id){
        CartService.deleteCart(id).then((response) => {
            getData();
        }).catch(function (error) {
            // if (error.response) {
            //     console.log(error.response.data);
            //     console.log(error.response.status);
            //     console.log(error.response.headers);
            //     alert(error.response.data.message);
            // }
            navigate("/product/sign-in"); 
        });
    }

    function getData(){
        CartService.getCartListing().then((response) => {
                setAPIData(response.data);
        }).catch(function (error) { 
            navigate("/product/sign-in"); 
          });
    } 

   
    return(
        <>
        <section id="blog-home" className="pt-5 mt-5 container">
            <h2 className="font-weight-bold pt-5">Shopping Cart</h2>
            <hr/>
        </section>

         <section id="cart-container" className="container my-5">
            <table width="100%">
                <thead>
                    <tr>
                        <td>Remove</td>
                        <td>Image</td>
                        <td>Product</td>
                        <td>Price</td>
                        <td>Quantity</td>
                        <td>Total</td>
                    </tr>
                </thead>
                <tbody>
                    {   
                        APIData.length>0 ? (
                            APIData.map(
                                (data) => {  
                                    return( 
                                        <tr  key={data._id}>
                                            <td><a href="javascript:void(0)" onClick={()=>deleteCartValue(data._id)}><i className="fas fa-trash-alt"></i></a></td>
                                            <td><img src={data.product.images} /></td>
                                            <td><h5>{data.product.name}</h5></td>
                                            <td><h5>${data.product.price}</h5></td>
                                            <td><input className="w-25 pl-1" value={data.quantity} type="number"/></td>
                                            <td><h5>Total ${data.product.price*data.quantity}</h5></td>
                                        </tr>
                                    )
                                }
                            )
                        ): ( 
                            <tr >
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr> 
                        )
                    }

                </tbody>
            </table>
         </section>
         <section id="cart-bottom" className="container">
            <div className="row">
                {/* <div className="coupon col-lg-6 col-md-6 col-12 mb-4">
                    <div className="">
                        <h5>COUPON</h5>
                        <p>Enter you coupon here</p>
                        <input type="text" placeholder="Coupon code" /> 
                        <button>Apply coupon</button>
                    </div>
                </div> */}
                <div className="total col-lg-12 col-md-6 col-12  ">
                    <div className="">
                        <h5>CART TOTAL</h5>
                        <div className="d-flex justify-content-between">
                            <h6>SubTotal</h6>
                            <p>${ APIData.reduce((total, obj) => obj.totalPrice + total,0)}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h6>Shipping</h6>
                            <p>$0</p>
                        </div>
                        <hr className="second-hr"/>
                        <div className="d-flex justify-content-between">
                            <h6>Total</h6>
                            <p >${ APIData.reduce((total, obj) => obj.totalPrice + total,0)}</p>
                        </div>
                        <button className="ml-auto" onClick={createOrder}>Checkout</button>
                    </div>
                </div>
            </div>
         </section>
        </>
    )
}

export default Cart;