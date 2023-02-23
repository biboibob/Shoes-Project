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
    ORDER_LIST: "/Order-List",
    ORDER_LIST_DETAIL: "/Order-List/:id",
}


export const APIRoutePath = {
    LOGIN: "/authServer/login",
    LOGOUT: "/authServer/logout",
    REFRESHTOKEN: "/authServer/refreshToken",

    USER: "/user",
    DETAIL_USER: "/user/detailUser",
    EDIT_USER: "/user/editUser",

    // Home
    HOME_INITIATE: "/home/homeInitiate",
    POPULAR: "/home/popular",
    NEW_RELEASE: "/home/newRelease",

    // Products
    PRODUCTS: "/categories/GetShoesListCategory",
    PRODUCTS_FILTER: "/categories/GetInitiateFilter",

    //Detail Shoes
    DETAIL_SHOES: "/detailProduct",

    //Summary 
    GET_PROVINCE: "/Summary/getProvince",
    GET_CITY: "/Summary/getCity",
    GET_COUR_OPTION: "/Summary/getShippingOption",
    PROCEED_TRANSACTION: "/Summary/proceedTransaction",
    ORDER_TRANSACTION: "/transaction",
    ORDER_TRANSACTION_DETAIL: "/transaction/transactionDetail"
} 
