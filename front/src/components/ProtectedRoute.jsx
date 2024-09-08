import {Navigate} from 'react-router-dom';

import {jwtDecode} from "jwt-decode";

import api from "../api";
import {ACCESS_TOKEN , REFRESH_TOKEN} from "../constants";
import { useState ,useEffect} from 'react';


function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(false);

    // Add the following code to the ProtectedRoute function:
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    },[]);
    // Add the following code to the ProtectedRoute function:
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const response = await api.post("/api/token/refresh/", {refresh:refreshToken});
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setIsAuthorized(true);
            }
            else{
                setIsAuthorized(false);
            }
        } catch (error) {
            console.error(error);
            setIsAuthorized(false );
        }
    };

    // Add the following code to the refreshToken function:
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {setIsAuthorized(false);return;}
        const decoded = jwtDecode(token);
        const tokenExperation = decoded.exp;
        const now = Date.now() / 1000;
        if (tokenExperation < now) {await refreshToken();}
        else {setIsAuthorized(true);}
    }
    // Add the following code to the ProtectedRoute function:
    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute;