import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import JWT from 'expo-jwt';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const jwtSecret = "b5b5c7fa8d21421fc82cf5275f74de78";

    const comparePasswords = async (password, hashedPassword) => {
        return await bcrypt.compare(password, hashedPassword);
    };

    // const signIn = async (email, password) => {
    //     try {
    //         const response = await axios.get("http://localhost:3001/users");
    //         const { data } = response;

    //         if (data) {
    //             const user = data.find(user => user.email === email);
    //             if (user) {
    //                 const isPasswordMatch = await comparePasswords(password, user.password);
    //                 console.log(isPasswordMatch);
    //                 console.log(isPasswordMatch);
    //                 if (isPasswordMatch) {
    //                     setUser(user);
    //                     localStorage.setItem('accessToken', user.token);
    //                     return true; // Đăng nhập thành công
    //                 } else {
    //                     return false; // Mật khẩu không khớp
    //                 }
    //             } else {
    //                 return false; // Không tìm thấy người dùng
    //             }
    //         } else {
    //             return false; // Không có dữ liệu người dùng
    //         }
    //     } catch (error) {
    //         console.error("Error signing in:", error);
    //         return false; 
    //     }
    // };

    const signIn = async (email, password) => {
        try {
            const response = await axios.get("http://localhost:3001/users");
            const { data } = response;

            if (data) {
                const user = data.find(user => user.email === email);
                if (user) {
                    const isPasswordMatch = await comparePasswords(password, user.password);
                    if (isPasswordMatch) {
                        const payload = { email: user.email, role: user.role };

                        const token = JWT.encode(payload, jwtSecret, {
                            expiresIn: "1h",
                        });
                        // console.log(token);

                        localStorage.setItem('accessToken', token);
                        setUser(user);
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error signing in:", error);
            return false;
        }
    };

    const removeToken = () => {
        localStorage.removeItem("accessToken");
    };

    const signOut = async () => {
        setUser(null);
        removeToken();
        navigate("/auth/login", { replace: true });
    };

    const getUserByAccessToken = async () => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            return null;
        }

        try {
            const decodedToken = JWT.decode(accessToken, jwtSecret);
            const user = {
                email: decodedToken.email,
                role: decodedToken.role
            };
            return user;
        } catch (error) {
            console.error("Error getting user from access token:", error);
            return null;
        }
    };


    return (
        <AuthContext.Provider value={{ user, signIn, signOut, getUserByAccessToken, removeToken }}>
            {children}
        </AuthContext.Provider>
    );
}
