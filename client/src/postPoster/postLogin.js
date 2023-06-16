//import './postLoginStyles.css'

import { useState } from "react"
import { useAsyncFn } from "../hooks/useAsync"
import { LoginPost } from "../services/posts"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

export function PostLogin() {
    const navigate = useNavigate()

    const[username, setUsername] = useState()
    const[password, setPassword] = useState()

    const LoginToPost = useAsyncFn(LoginPost)

    const HandleLogin = () => {
        console.log(username+password)
        const temp = LoginToPost    
                    .execute({username,password})
                    .then(ans=>{
                        if(ans===null) {
                            window.alert("Failed Login")
                        }
                        else{
                            Cookies.set('postId', ans.id, {sameSite: 'strict'})
                            window.alert("Loggin Succesfull")
                            const goToHome = () => navigate(`/PostProfile`)
                            goToHome()
                        }
                    })
    }


    return  <>
         <section>
   <div class="signin"> 

    <div class="content"> 

     <h2>Sign In</h2> 

     <div class="form"> 

      <div class="inputBox"> 

       <input type="text" onChange={(e=>setUsername(e.target.value))} required/> <i>Username</i> 

      </div> 

      <div class="inputBox"> 

       <input type="password" onChange={(e=>setPassword(e.target.value))} required/> <i>Password</i> 

      </div> 

      <div class="links"> <a href="/">Home</a> <a href="/PostSignup">Signup</a> 

      </div> 

      <div class="inputBox"> 

       <input type="submit" onClick={HandleLogin} value="Login"/> 

      </div> 

     </div> 

    </div> 

   </div> 

  </section> 

    
    </>
}