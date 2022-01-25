import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/seller/AuthService";
import ProductService from "../../services/seller/ProductService";

const SellerProductListing=()=>{
    let navigate = useNavigate()
    const [APIData, setAPIData] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        // axios.get(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`)
        //     .then((response) => {
        //         setAPIData(response.data);
        //     })
        if(!AuthService.getCurrentSeller()){
            alert()
            navigate("/seller/sign-in")
            return false;
        } 
        const user = { name: "", country: "", state: "", city: "",address:"" };
        ProductService.getSellerProductListing(user).then((response) => {
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
    }, []);

    function addProduct(){
        navigate("/seller/add-product",{replace:true})
    }

    function editProduct(id){
        // navigate("../edit-product/"+id,{replace:true}); 
        navigate("/seller/edit-product/"+id); 
    }

    function viewProduct(id){
        // navigate("../product-details/"+id,{replace:true}); 
        navigate("/seller//product-details/"+id); 
    }

    function deleteProduct(id){
        ProductService.deleteProduct(id).then((response) => {
            getData();
        }).catch(function (error) {
            // if (error.response) {
            //     console.log(error.response.data);
            //     console.log(error.response.status);
            //     console.log(error.response.headers);
            //     alert(error.response.data.message);
            // }
            navigate("/sign-in"); 
        });
    }

    function getData(){
        const user = { name: "", country: "", state: "", city: "",address:"" };
        ProductService.getSellerProductListing(user).then((response) => {
                setAPIData(response.data);
        }).catch(function (error) {
            // if (error.response) {
            //     console.log(error.response.data);
            //     console.log(error.response.status);
            //     console.log(error.response.headers);
            //     alert(error.response.data.message);
            // }
            // navigate("../sign-in", { replace: true }); 
            navigate("/seller/sign-in"); 
          });
    } 

    // return (
    //     <div className="inner-list">
    //          <h2 className="text-center">My Product List</h2>
    //          <div className = "row">
    //             <button className="btn btn-primary" onClick={addProduct}> Add Product</button>
    //          </div>
    //          <br></br>
    //          <div className = "row">
    //              <div className="col-lg-12">
    //                 <table className = "table table-striped table-bordered">
    //                     <thead>
    //                         <tr>
    //                             <th> Product Name</th>
    //                             <th> Category</th>
    //                             <th> Sub Category</th>
    //                             <th> Price</th> 
    //                             <th> Actions</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         {   
    //                             APIData.map(
    //                                 (data) => {  
    //                                     return(
    //                                         <tr key = {data._id}>
    //                                             <td> {data.name} </td>   
    //                                             <td> {data.category.name}</td>
    //                                             <td> {data.subCategory.subname}</td>
    //                                             <td> {data.price}</td> 
    //                                             <td>
    //                                                 <button onClick={ () =>  editProduct(data._id)} className="btn btn-info">Update </button>
    //                                                 <button style={{marginLeft: "10px"}} onClick={ () => deleteProduct(data._id)} className="btn btn-danger">Delete </button>
    //                                                 {/* <button style={{marginLeft: "10px"}} onClick={ () => viewParking(data._id)} className="btn btn-info">View </button> */}
    //                                             </td>
    //                                         </tr>
    //                                     )
    //                                 }    
    //                             )
    //                         }
    //                     </tbody>
    //                 </table>
    //             </div>
    //          </div>
    //     </div>
    // )

    return (
        <>
        <section id="blog-home" className="pt-5 container">
            <div className = "row ">
                <h2 className="font-weight-bold pt-5">My Product List</h2> 
                 <button className="ml-auto mt-5 add-product  " onClick={addProduct}> Add Product</button> 
             </div>
            <hr/>
       
        </section>
        <section className="container"> 
            
             <br></br>
             <div className = "row">
                 <div className="col-lg-12">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Product Name</th>
                                <th> Category</th>
                                <th> Sub Category</th>
                                <th> Price</th> 
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {   
                            APIData.length>0 ? (
                                APIData.map(
                                    (data) => {  
                                        return(
                                            <tr key = {data._id}>
                                                <td> {data.name} </td>   
                                                <td> {data.category.name}</td>
                                                <td> {data.subCategory.subname}</td>
                                                <td> {data.price}</td> 
                                                <td>
                                                    <button onClick={ () =>  editProduct(data._id)} className="btn btn-info">Update </button>
                                                    <button style={{marginLeft: "10px"}} onClick={ () => deleteProduct(data._id)} className="btn btn-danger">Delete </button>
                                                    {/* <button style={{marginLeft: "10px"}} onClick={ () => viewParking(data._id)} className="btn btn-info">View </button> */}
                                                </td>
                                            </tr>
                                        )
                                    }    
                                )
                            ):(
                                <tr>
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
                </div>
             </div>
        </section>
        </>
    )
}

export default SellerProductListing;

 