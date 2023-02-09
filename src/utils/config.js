export const PageRoutePath = {
    //Auth
    LOGIN: "/",
    REGISTER: "/Register",

    //App
    HOME: "/Home",
    PRODUCTS: "/Products",
    DETAIL_PRODUCTS: "/Products/:id",
    CART: "/Cart",
    SUMMARY: "/Summary",
}


export const APIRoutePath = {
    LOGIN: "/authServer/login",
    LOGOUT: "/authServer/logout",
    REFRESHTOKEN: "/authServer/refreshToken",

    USER: "/user",
    DETAIL_USER: "/user/detailUser",
    EDIT_USER: "/user/editUser",

    // Home
    HOME_INITIATE: "/home/HomeInitiate",

    // Products
    PRODUCTS: "/categories/GetShoesListCategory",
    PRODUCTS_FILTER: "/categories/GetInitiateFilter",

    //Detail Shoes
    DETAIL_SHOES: "/detailProduct",

    //Summary 
    GET_PROVINCE: "/Summary/getProvince",
    GET_CITY: "/Summary/getCity",
    GET_COUR_OPTION: "/Summary/getShippingOption"
} 
