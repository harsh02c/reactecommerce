import React from "react";

const Footer=()=>{
    return(
        <>
            <footer className="mt-5 py-5">
                <div className="row contanier mx-auto pt-5">
                    <div className="footer-one col-lg-3 col-md-6 col-12">
                        <img src="/assets/img/logo2.png"/>
                        <p className="pt-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                    </div>
                    <div className="footer-one col-lg-3 col-md-6 col-12 mb-3">
                        <h5>Featured</h5>
                        <ul className="text-uppercase list-unstyled">
                            <li><a href="#">men</a></li>
                            <li><a href="#">women</a></li>
                            <li><a href="#">boys</a></li>
                            <li><a href="#">girls</a></li>
                            <li><a href="#">new arrivals</a></li>
                            <li><a href="#">shoes</a></li>
                            <li><a href="#">clothes</a></li>
                        </ul>
                    </div>
                    <div className="footer-one col-lg-3 col-md-6 col-12 mb-3">
                        <h5 className="pb-2">Contact Us</h5>
                       <div>
                           <h6 className="text-uppercase">Address</h6>
                           <p>123 street name,city,US</p>
                       </div>
                       <div>
                           <h6 className="text-uppercase">Phone</h6>
                           <p>888888888</p>
                       </div>
                       <div>
                           <h6 className="text-uppercase">Email</h6>
                           <p>888888888</p>
                       </div>
                    </div>
                    <div className="footer-one col-lg-3 col-md-6 col-12  mb-3">
                        <h5 className="pb-2">Instagram</h5>
                       <div className="row">
                           <img className="img-fluid w-25 h-100 m-2" src="/assets/img/insta/1.jpg" alt=""/>
                           <img className="img-fluid w-25 h-100 m-2" src="/assets/img/insta/2.jpg" alt=""/>
                           <img className="img-fluid w-25 h-100 m-2" src="/assets/img/insta/3.jpg" alt=""/>
                           <img className="img-fluid w-25 h-100 m-2" src="/assets/img/insta/4.jpg" alt=""/>
                           <img className="img-fluid w-25 h-100 m-2" src="/assets/img/insta/5.jpg" alt=""/>
                       </div> 
                    </div>
                </div>
                <div className="copyright mt-5">
                    <div className="row container mx-auto">
                        <div className="col-lg-3 col-md-6 col-12 mb-4">
                            <img src="/assets/img/payment.png" alt=""/>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12 text-nowrap mb-2">
                            <p>Harsh eCommerce@2022. All Rights Reserved</p>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer