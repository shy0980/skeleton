import { SignupUser } from "../services/users";
import React from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useAsyncFn } from '../hooks/useAsync';

export function UserSignup() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [Fname, setFaname] = useState("")
    const [etc1, setetc1] = useState("")
    const [etc2, setetc2] = useState("")
    const [etc3, setetc3] = useState("")

    const SignupVerificationFn = useAsyncFn(SignupUser)

    const HandleLogin=()=> {
        console.log(username)
        const details = SignupVerificationFn
                .execute({email: username, password: password,name: Fname})
                .then(temp=>{
                    if(temp === null) {
                      window.alert("Some error occured :(")
                    } else {
                            window.alert("Kindly verify you email and then Login:))")
                            const goToHome = () => navigate(`/`)
                            goToHome()
                    }
                })
    }

    

    return <>
        <div>
            <h2>Signup to your USER account</h2>
            <form>
                <h1>Name</h1>
                <input title="fname"
                value={Fname}
                onChange={(e=> setFaname(e.target.value))}
                />
                <br></br>
                <h1>Username/Email</h1>
                <input title="uname"
                value={username}
                onChange={(e=> setUsername(e.target.value))}
                />
                <br></br>
                <h1>Passowrd</h1>
                <input title="pword"
                value={password}
                onChange={(e=> setPassword(e.target.value))}
                />
                <br></br>
                <h1>Etc1</h1>
                <input title="etc1"
                value={etc1}
                onChange={(e=> setetc1(e.target.value))}
                />
                <br></br>
                <h1>Etc2</h1>
                <input title="etc2"
                value={etc2}
                onChange={(e=> setetc2(e.target.value))}
                />
                <br></br>
                <h1>Etc3</h1>
                <input title="etc3"
                value={etc3}
                onChange={(e=> setetc3(e.target.value))}
                />
                <br></br>
                <button type="button" onClick={HandleLogin} >Login</button>
            </form>
        </div> 
    
    </>
}
