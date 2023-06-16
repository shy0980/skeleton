import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


export function SignoutNav(){
    const [userId, setUserId] = useState(Cookies.get('userId'))
    const navigate = useNavigate()
    
    function SignoutUser() { 
        Cookies.remove('userId')
        const goToHome = () => navigate(`/`)
        window.location.reload(false);
        goToHome()
     }
    

    return <>
    <ul class="nav">
            <li><a href="/">Home</a></li>
            <li><a href="/">About Us</a></li>
            <li><a href="/Profile">Dashboard</a></li>
            <li><button type="button" onClick={SignoutUser}>Signout</button></li>
    </ul>
    </>
}