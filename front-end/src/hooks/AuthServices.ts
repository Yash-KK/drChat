import axios from "axios";
import { AuthServiceProps } from "../@types/auth-serice";
import { useState } from "react";

export function useAuthService(): AuthServiceProps {

    const getInitialLoggedInValue = () => {
        const loggedIn = localStorage.getItem("isLoggedIn");
        return loggedIn !== null && loggedIn == "true"
    }
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>((getInitialLoggedInValue));

    // const getUserIdFromToken = (access: string) => {
    //     const token = access
    //     const tokenParts = token.split(".")
    //     const encodedPayLoad = tokenParts[1];
    //     const decodedPayLoad = atob(encodedPayLoad);
    //     const payLoadData = JSON.parse(decodedPayLoad);
    //     const userId = payLoadData.user_id
    //     return userId
    // }

    // const getUserDetails = async () => {
    //     try {
    //         const userId = localStorage.getItem("userId");
    //         const accessToken = localStorage.getItem("access_token");

    //         const response = await axios.get(
    //             `http://127.0.0.1:8000/api/account/?user_id=${userId}`, {
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`
    //             }

    //         }
    //         )

    //         const userDetails = response.data;
    //         localStorage.setItem("username", userDetails.username);
    //         setIsLoggedIn(true)
    //         localStorage.setItem("isLoggedIn", "true")
    //     } catch (err: any) {
    //         setIsLoggedIn(false)
    //         localStorage.setItem("isLoggedIn", "false")
    //         return err
    //     }
    // }

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/token/", {
                username,
                password
            }, { withCredentials: true }
            )

            localStorage.setItem("isLoggedIn", "true")
            setIsLoggedIn(true)
            // getUserDetails();
        } catch (err: any) {
            setIsLoggedIn(false)
            localStorage.setItem("isLoggedIn", "false")
            return err
        }
    }

    const logout = () => {
        localStorage.setItem("isLoggedIn", "false");
        setIsLoggedIn(false)
    }
    return { login, isLoggedIn, logout }
}