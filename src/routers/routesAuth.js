import React from "react";
import Register from "pages/authentication/Register";
import Login from "pages/authentication/Login";
import ResetPassword from "pages/authentication/ResetPassword";

var routesAuth = [
    {
        path: "/login",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        component: <Login />,
        layout: "/auth",
    },
    {
        path: "/register",
        name: "Register",
        icon: "ni ni-circle-08 text-pink",
        component: <Register />,
        layout: "/auth",
    },
    {
        path: "/change-password",
        name: "Register",
        icon: "ni ni-circle-08 text-pink",
        component: <ResetPassword />,
        layout: "/auth",
    },
];
export default routesAuth;