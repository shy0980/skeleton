import Cookies from "js-cookie";


export function UserSignOut() {
    Cookies.remove('userId')
    return <>
        <h1>Signed Out Successfully</h1>
        <a href="/">HOME</a>
    </>
}