export default function authHeader() {
    const seller = JSON.parse(localStorage.getItem('sellerData')); 
    if (seller && seller.token) {
    //   return { Authorization: 'Bearer ' + seller.accessToken };
      return { Authorization: seller.token};
    } else {
      return {};
    }
}
