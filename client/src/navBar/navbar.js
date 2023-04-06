import Cookies from 'js-cookie';
import { LoginNav } from './LoginNav';
import { SignoutNav } from './SignoutNav';

export function NavBar() {
    const userID = Cookies.get('userId');
    return <>
        {userID===undefined && <LoginNav/>}
        {userID!==undefined && <SignoutNav/>}
    </>
}