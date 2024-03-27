import React, { useEffect, useState } from "react";
import { useLocation, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "../routers/routes.js";
import { BASE_API } from "constant/network.js";
import { useAuth } from "context/auth.js";
import axios from "axios";

const Admin = (props) => {
  const navigate = useNavigate();
  const mainContent = React.useRef(null);
  const location = useLocation();
  const { getUserByAccessToken } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // const checkToken = async () => {
    //   try {
    //     const accessToken = localStorage.getItem('accessToken');
    //     if (accessToken) {
    //       const user = await getUserByAccessToken();
    //       if (user) {
    //         const { data } = await axios.get(`${BASE_API}/users?email=${user.email}`);

    //         if (user.password === data[0].password) {
    //           return true;
    //         }

    //       }
    //     }
    //   } catch (error) {
    //     console.error('Error checking token:', error);
    //   }
    // };
    // checkToken();

    const checkAuth = async () => {
      try {
        const user = await getUserByAccessToken();
        if (!user) {
          navigate('/auth/login');
        } else if (user.role !== 'ADMIN') {
          navigate('/error');
        } else {
          const response = await axios.get(`${BASE_API}/users`);
          const { data } = response;
          if (data) {
            const foundUser = data.find(userData => userData.email === user.email);
            setCurrentUser(foundUser);
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };
    checkAuth();
  }, [getUserByAccessToken, navigate, setCurrentUser]);


  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/argon-react.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
          currentUser={currentUser}
        />
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
