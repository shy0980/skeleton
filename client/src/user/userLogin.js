import React from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useAsyncFn } from '../hooks/useAsync';
import { LoginUser } from '../services/users';

export function UserLogin() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const LoginVerificationFn = useAsyncFn(LoginUser)

    const HandleLogin=()=> {
        const details = LoginVerificationFn
                .execute({username, password})
                .then(temp=>{
                    if(temp === null) {
                      window.alert("enter valid details")
                    } else {
                        if(temp.verified){
                            Cookies.set('userId', temp.id, {sameSite: 'strict'})
                            window.alert("Logged in successfully")
                            const goToHome = () => navigate(`/`)
                            goToHome()
                        }
                        else{
                            window.alert("Kinfly verify you email sent at "+temp.email)
                        }
                    }
                })
    }

    

    return <>
        <div>
            <h2>Login to your USER account</h2>
            <form>
                <input title="uname"
                value={username}
                onChange={(e=> setUsername(e.target.value))}
                />
                <br></br>
                <input title="pword"
                value={password}
                onChange={(e=> setPassword(e.target.value))}
                />
                <br></br>
                <button type="button" onClick={HandleLogin} >Login</button>
            </form>
        </div> 
    
    </>
}
