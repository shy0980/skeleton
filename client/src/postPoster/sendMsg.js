import Cookies from "js-cookie"
import { useEffect, useState } from "react";
import { useAsyncFn } from "../hooks/useAsync";
import { GetMsg, SendMsg, getAllUsers, getDetailsPost } from "../services/posts";

export function SendMsgPost() {
    const postId = Cookies.get('postId');
    const [postData, setPostData] = useState();
    const [userData, setusersData] = useState();
    const [message, setmessage] = useState();
    const [userId, setuserId] = useState();
    const [click, setClick] = useState(false);

    const postDataFn = useAsyncFn(getDetailsPost)
    const userDataFn = useAsyncFn(getAllUsers)
    const sendMsgFn = useAsyncFn(SendMsg)


    const handleSend=()=> {
        sendMsgFn.execute({postId, userId, message}).then(ans=>{
            if(ans===null) {
                window.alert("Error sending message / You already sent this user message ")
            }
            else{
                window.alert("You msg was sent")
            }
        })
    }

    useEffect(()=>{
        console.log(message + " " + userId)
    },[message, userId])

    useEffect(() => {
       postDataFn.execute({postId}).then(ans=>setPostData(ans))
       userDataFn.execute().then(ans=>setusersData(ans))
    }, [postId])

    console.log(postData)
    console.log(userData)

    return <>
    <a href="/PostProfile" > Back To you profile</a>
    
    {userData?.map(user=>{
        return <p key={user.email}>
            <p>Hello my nigger + {user.email}</p>
            <button onClick={()=>setuserId(user.id)}>Message</button>
            {user.id===userId && <form>
                <label>Enter message</label>
                <input onChange={e=>setmessage(e.target.value)}></input>
                <button onClick={handleSend}>Send Message</button>
            </form>}
            
        </p>
    })}
    </>
    
}