export const PageRoutePath = {
    //Auth
    LOGIN: "/",
    REGISTER: "/Register",

    //App
    HOME: "/Home",
    PRODUCTS: "/Products",
    DETAIL_PRODUCTS: "/Products/:id",
    CART: "/Cart",
}


export const APIRoutePath = {
    LOGIN: "/authServer/login",
    LOGOUT: "/authServer/logout",
    REFRESHTOKEN: "/authServer/refreshToken",

    USER: "/user",
    EDIT_USER: "/user/editUser",

    // Home
    HOME_INITIATE: "/home/HomeInitiate"
} 
