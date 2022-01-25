import React, { useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ProductService from "../../services/seller/ProductService";
import AuthService from "../../services/seller/AuthService";

const AddProduct=()=>{
    let navigate = useNavigate();
    const [APICategoryData, setAPICategoryData] = useState([]);
    const [APISubCategoryData, setAPISubCategoryData] = useState([]);
    const [selectedFile, setSelectedFile] = useState();

    useEffect(() => {
        if(!AuthService.getCurrentSeller()){
            navigate("/seller/sign-in")
        }

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
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required.'), 
        category: Yup.string()
            .required('Category is required.'),
        subcategory: Yup.string()
            .required('Sub Category is required.'),
        description: Yup.string()
            .required('Description is required.'),
        price: Yup.string()
            .required('Price is required.')
            .matches(/^[0-9]+$/, "Price be only digits."),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    // get functions to build form with useForm() hook
    const { register, handleSubmit,reset,  formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(product) {
        // display form data on success
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(product, null, 4));
        // return false;
        const sellerId = AuthService.getCurrentSeller()._id;
        const formData = new FormData();
        formData.append('name',product.name)
        formData.append('category',product.category)
        formData.append('subCategory',product.subcategory)
        formData.append('price',parseFloat(product.price))
        formData.append('description',product.description)
        formData.append('seller',sellerId)
        formData.append('images',selectedFile)

        ProductService.addProduct(formData).then(res =>{
            // navigate("../", { replace: true }); 
            navigate("/seller/seller-products", { replace: true }); 
        });
    }
    
    function redirectListing(){
        navigate("/seller/seller-products");
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

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]); 
	};
    // return (
    //     <div className="inner-form">
    //         <form onSubmit={handleSubmit(onSubmit)} >
    //             <h3>Add Product</h3>
    //             <div className="row">
    //                 <div className="col-lg-6">
    //                     <div className="form-group">
    //                         <label>Name</label>
    //                         <input type="text"   {...register('name')} placeholder="Enter Product Name" className="form-control" />
    //                         <div className="invalid-feedback">{errors.name?.message}</div>
    //                     </div>
    //                 </div>
    //                 <div className="col-lg-6">
    //                     <div className="form-group">
    //                         <label>Category</label>
    //                         {/* <input type="text"  {...register('category')} placeholder="Enter Category" className="form-control" /> */}
    //                         <select  {...register('category')} className="form-control" id="category" onChange={loadSubCategory}>
    //                             <option value="">Select Category</option>
    //                             {   
    //                                 APICategoryData.map(
    //                                     (data) => {  
    //                                         return(
    //                                             <option  key = {data._id} value={data._id}>{data.name}</option>
    //                                         )
    //                                     }    
    //                                 )
    //                             }
    //                         </select>
    //                         <div className="invalid-feedback">{errors.category?.message}</div>
    //                     </div>
    //                 </div> 
    //                 <div className="col-lg-6">
    //                     <div className="form-group">
    //                         <label>Sub Category</label>
    //                         <select    {...register('subcategory')} className="form-control">
    //                             <option value="">Select Sub Category</option>
    //                             {   
    //                             APISubCategoryData.map(
    //                                 (data) => {  
    //                                     return(
    //                                         <option  key = {data._id} value={data._id}>{data.subname}</option>
    //                                     )
    //                                 }    
    //                             )
    //                         }
    //                         </select>
    //                         <div className="invalid-feedback">{errors.subcategory?.message}</div>
    //                     </div>
    //                 </div>
    //                 <div className="col-lg-6">
    //                     <div className="form-group">
    //                         <label>Price</label>
    //                         <input type="text" {...register('price')} placeholder="Enter Price" className="form-control" />
    //                         <div className="invalid-feedback">{errors.price?.message}</div>
    //                     </div>
    //                 </div>
    //                 <div className="col-lg-6">
    //                     <div className="form-group">
    //                         <label>Description</label>
    //                         <input type="text" {...register('description')} placeholder="Enter Description" className="form-control" />
    //                         <div className="invalid-feedback">{errors.description?.message}</div>
    //                     </div>
    //                 </div>
         
    //                 <div className="col-lg-6">
    //                     <div className="form-group">
    //                         <label>Image</label>
    //                         <input type="file" {...register('images')} placeholder="Select Images" className="form-control" onChange={changeHandler} />
    //                         <div className="invalid-feedback">{errors.images?.message}</div>
    //                     </div>
    //                 </div>
    //                 <div className="col-lg-6">
    //                     <span><button className="btn btn-dark btn-lg btn-block" onClick={redirectListing}>Back</button></span> &nbsp;
    //                     <span><button type="submit"  className="btn btn-dark btn-lg btn-block">Add Product</button>  </span>
    //                 </div>
    //             </div>
    //         </form>
    //     </div>
    // )

    return (
        <>
             <section id="blog-home" className="pt-5 mt-5 container">
                <h2 className="font-weight-bold pt-5">Add Product</h2>
                <hr/>
            </section> 
            <section id="login" className="container"> 
                <div className="login-form col-lg-12 col-md-6 col-12 mb-4">
                    <div className="row"> 
                        <form className="container  mt-4" onSubmit={handleSubmit(onSubmit)} > 
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text"   {...register('name')} placeholder="Enter Product Name" className="form-control" />
                                        <div className="invalid-feedback">{errors.name?.message}</div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Category</label>
                                        {/* <input type="text"  {...register('category')} placeholder="Enter Category" className="form-control" /> */}
                                        <select  {...register('category')} className="form-control" id="category" onChange={loadSubCategory}>
                                            <option value="">Select Category</option>
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
                                        <div className="invalid-feedback">{errors.category?.message}</div>
                                    </div>
                                </div> 
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Sub Category</label>
                                        <select    {...register('subcategory')} className="form-control">
                                            <option value="">Select Sub Category</option>
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
                                        <div className="invalid-feedback">{errors.subcategory?.message}</div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Price</label>
                                        <input type="text" {...register('price')} placeholder="Enter Price" className="form-control" />
                                        <div className="invalid-feedback">{errors.price?.message}</div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Description</label>
                                        <input type="text" {...register('description')} placeholder="Enter Description" className="form-control" />
                                        <div className="invalid-feedback">{errors.description?.message}</div>
                                    </div>
                                </div>
                    
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Image</label>
                                        <input type="file" {...register('images')} placeholder="Select Images" className="form-control" onChange={changeHandler} />
                                        <div className="invalid-feedback">{errors.images?.message}</div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-5">
                                    <span><button className="ml-auto" onClick={redirectListing}>Back</button></span> &nbsp;
                                    <span><button type="submit"  className="ml-auto">Add Product</button>  </span>
                                </div>
                            </div>
                        </form> 
                    </div>
                </div>    
            </section>
        </>
    )
}

export default AddProduct;