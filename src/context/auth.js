import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const comparePasswords = async (password, hashedPassword) => {
        return await bcrypt.compare(password, hashedPassword);
    };

    const signIn = async (email, password) => {
        try {
            const response = await axios.get("http://localhost:3001/users");
            const { data } = response;
            
            if (data) {
                const user = data.find(user => user.email === email);
                if (user) {
                    const isPasswordMatch = await comparePasswords(password, user.password);
                    console.log(isPasswordMatch);
                    console.log(isPasswordMatch);
                    if (isPasswordMatch) {
                        setUser(user);
                        localStorage.setItem('accessToken', user.token);
                        return true; // Đăng nhập thành công
                    } else {
                        return false; // Mật khẩu không khớp
                    }
                } else {
                    return false; // Không tìm thấy người dùng
                }
            } else {
                return false; // Không có dữ liệu người dùng
            }
        } catch (error) {
            console.error("Error signing in:", error);
            return false; 
        }
    };


    const signOut = async () => {
        setUser(null);
        localStorage.removeItem('accessToken');
    };

    const getUserByAccessToken = async () => {
        const accessToken = localStorage.getItem('accessToken');
    
        if (!accessToken) {
            return null;
        }
    
        try {
            const response = await axios.get(`http://localhost:3001/users/${accessToken}`);
    
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error getting user from access token:", error);
            return null;
        }
    };
    

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, getUserByAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
}
