import { useLocation } from "react-router-dom"

export function LoginNav(){
    const CurrRoute = useLocation();
    return <>
    <ul class="nav">
            <li><a href="/">Home</a></li>
            <li><a href="/">About Us</a></li>
            <li><a href={CurrRoute.pathname==="/Login" ? "/" : "/Login"}>Login/Back</a></li>
            <li><a href={CurrRoute.pathname==="/Signup" ? "/" : "/Signup"}>SignUp/Back</a></li>
    </ul>
    </>
}