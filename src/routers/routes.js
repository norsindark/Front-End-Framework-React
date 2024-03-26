import React from "react";
import Index from "views/Index.js";
import Profile from "pages/profile/Profile";
// import Register from "views/examples/Register.js";
// import Login from "views/examples/Login.js";
import TableUsers from "pages/users/TableUsers";
import Icons from "views/examples/Icons.js";
import TableProducts from "pages/products/TableProducts";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
    roles: ['ADMIN'] 
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: <Icons />,
    layout: "/admin",
    roles: ['ADMIN'] 
  },
  {
    path: "/user-profile",
    name: "My Profile",
    icon: "ni ni-circle-08",
    component: <Profile />,
    layout: "/admin",
    roles: ['ADMIN'] 
  },
  {
    path: "/table-users",
    name: "Table Users",
    icon: "ni ni-single-02",
    component: <TableUsers />,
    layout: "/admin",
    roles: ['ADMIN'] 
  },
  {
    path: "/table-products",
    name: "Table Products",
    icon: "ni ni-archive-2",
    component: <TableProducts />,
    layout: "/admin",
    roles: ['ADMIN'] 
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: <Login />,
  //   layout: "/auth",
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: <Register />,
  //   layout: "/auth",
  // },
];
export default routes;