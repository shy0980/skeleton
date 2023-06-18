import Cookies from "js-cookie"
import { useEffect, useState } from "react";
import { useAsyncFn } from "../hooks/useAsync";
import { GetMsg, getDetailsPost } from "../services/posts";

export function PostProfile() {
    const postId = Cookies.get('postId');
    const [postData, setPostData] = useState();
    const [msgData, setmsgData] = useState();
    
    const getpostData = useAsyncFn(getDetailsPost)
    const getmsgData = useAsyncFn(GetMsg);

    useEffect(() => {
       getpostData.execute({postId}).then(ans=>setPostData(ans))
       getmsgData.execute({postId}).then(ans=>setmsgData(ans))
    

    }, [postId])

    console.log(postData)
    console.log(msgData)

    return  <>
        <p>This is Startup Dashboard </p>
        <a href="/PostSendMsg">Click here to send invester Message</a>
    </>
    
}