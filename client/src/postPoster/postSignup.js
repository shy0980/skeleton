//import './postLoginStyles.css'

import { useState } from "react"
import { useAsyncFn } from "../hooks/useAsync"
import { putPost } from "../services/posts"
import { useNavigate } from "react-router-dom"

export function PostSignup() {
    const navigate = useNavigate()

    const [atr1, setUname] = useState()
    const [atr2, setPword] = useState()
    const [title, setTitle] = useState()
    const [body, setBody] = useState()
    const [atr3, setatr3] = useState()
    const [atr4, setatr4] = useState()

    const PutPost = useAsyncFn(putPost)


    const HandleLogin = () => {
        console.log()
        const temp = PutPost
                    .execute({title,body,atr1,atr2,atr3,atr4})
                    .then(temp=>{
                        if(temp===null) {
                            window.alert("Error Putting post")
                        }
                        else{
                            window.alert("Post Successfully listed kindly login :)")
                            const goToHome = () => navigate(`/`)
                            goToHome()
                        }
                    })
    }

    return  <>
         <section>

   <div class="signin"> 

    <div class="content"> 

     <h2>SignUp Mr.Startup</h2> 

     <div class="form"> 

      <div class="inputBox"> 

       <input type="text" onChange={(e=>setUname(e.target.value))} required/> <i>Username</i> 

      </div> 

      <div class="inputBox"> 

       <input type="password" onChange={(e=>setPword(e.target.value))} required/> <i>Password</i> 

      </div> 

       <div class="inputBox"> 

       <input type="text" onChange={(e=>setTitle(e.target.value))} required/> <i>Title</i> 

      </div> 

       <div class="inputBox"> 

       <input type="text" onChange={(e=>setBody(e.target.value))} required/> <i>Body</i> 

      </div> 

       <div class="inputBox"> 

       <input type="text" onChange={(e=>setatr3(e.target.value))} required/> <i>ATR3</i> 

      </div> 

       <div class="inputBox"> 

       <input type="text" onChange={(e=>setatr4(e.target.value))} required/> <i>ATR4</i> 

      </div> 

      <div class="links"> <a href="/">Home</a> <a href="/PostLogin">Login</a> 

      </div> 

      <div class="inputBox"> 

       <input type="submit" onClick={HandleLogin} value="Put Post"/> 

      </div> 

     </div> 

    </div> 

   </div> 

  </section> 

    
    </>
}