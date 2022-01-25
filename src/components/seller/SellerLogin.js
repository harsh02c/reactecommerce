import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AuthService from "../../services/seller/AuthService";

const SellerLogin=()=>{
    let navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required.')
            .email('Email is invalid.'), 
        password: Yup.string()
            // .min(6, 'Password must be at least 6 characters.')
            .required('Password is required.'),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;
    
    function onSubmit(user) {
        // display form data on success
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
        // return false;

        AuthService.loginSeller(user).then(res =>{ 

            //Save data to local storage
            localStorage.setItem('sellerData',  JSON.stringify(res.data));
            localStorage.setItem('sellerToken', res.data.token);
            localStorage.setItem('sellerId', res.data._id); 
            // Header.forceUpdate();
 
            // navigate("/"); 
            window.location = "/seller/seller-products";

        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                alert(error.response.data.message);
            }
        });
    }

    function redirectRegister(){
        // navigate("../register", { replace: true }); 
        navigate("/seller/register"); 
    }

    // return (
    //     <div className="inner">
    //         <form onSubmit={handleSubmit(onSubmit)}>
    //             <h3>Log In</h3>
    //             <div className="form-group">
    //                 <label>Email</label>
    //                 <input type="text" name="email" {...register('email')} className="form-control" placeholder="Enter Email" />
    //                 <div className="invalid-feedback">{errors.email?.message}</div>
    //             </div>
    //             <div className="form-group">
    //                 <label>Password</label>
    //                 <input type="password" {...register('password')}  className="form-control" placeholder="Enter Password" />
    //                 <div className="invalid-feedback">{errors.password?.message}</div>
    //             </div>
    //             <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button> 
    //             <p className="forgot-password text-right">
    //                 New User? <a href="javascript:void(0)" onClick={redirectRegister}  >Register</a>
    //             </p>
    //         </form>
    //     </div>    
    // );
        return (
            <>
                <section id="blog-home" className="pt-5 mt-5 container">
                    <h2 className="font-weight-bold pt-5">Seller Login</h2>
                    <hr/>
                </section>

                <section id="login" className="container"> 
                    <div className="login-form col-lg-12 col-md-6 col-12 mb-4">
                        <div className="row"> 
                            <form  className="container  mt-4" onSubmit={handleSubmit(onSubmit)}> 
                            <div className="form-group col-lg-12 col-md-6 col-12 mb-4">
                                <label>Email</label>
                                <input type="text" name="email" {...register('email')} className="form-control" placeholder="Enter Email" />
                                <div className="invalid-feedback">{errors.email?.message}</div>
                            </div>
                            <div className="form-group col-lg-12 col-md-6 col-12 mb-4">
                                <label>Password</label>
                                <input type="password" {...register('password')}  className="form-control" placeholder="Enter Password" />
                                <div className="invalid-feedback">{errors.password?.message}</div>
                            </div>
                            <button type="submit" className="btn btn-dark btn-lg btn-block col-lg-12 col-md-6 col-12 mb-4">Sign in</button> 
                            <p className="forgot-password text-right">
                                New User? <a href="javascript:void(0)" onClick={redirectRegister}  >Register</a>
                            </p>
                        </form>
                        </div>
                    </div> 
                </section>
            </> 
    );
} 

export default SellerLogin;