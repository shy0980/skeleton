// user ki info 
// display the posts user upvoted
// get MSG recived by a particular user
import { useAsyncFn } from "../hooks/useAsync";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getMessages } from "../services/users";
import { userUpvotedPosts } from "../services/users";
import { getUser } from "../services/users";



export function UserProfile() {
    const userId = Cookies.get('userId')
    console.log(userId)


    // FUNCTION TO GET THE INFO
    const GetUserDetails = useAsyncFn(getUser)
    const getMessagesDetails = useAsyncFn(getMessages)
    const getUpvotesPosts = useAsyncFn(userUpvotedPosts)

    // THESE CONST CONTAIN DATA OBJECT OF INFOS TO BE DISPLAYED
    const [userData, setUserData] = useState()
    const [msgData, setmsgData] = useState()
    const [upvotePostData, setUpvotePostData] = useState()

    // USING UDEEFFECT TO SOLVE RERENDER PROBLEM
    useEffect(() => {
        GetUserDetails.execute({userId}).then(ans=>setUserData(ans));
        getMessagesDetails.execute({userId}).then(ans=>setmsgData(ans));
        getUpvotesPosts.execute({userId}).then(ans=>setUpvotePostData(ans));
    }, [userId])

    // CONSOLE LOGGING *everything is being displayed till now*
    console.log(userData)
    console.log(msgData)
    console.log(upvotePostData)
    
    // BAS AB DISPLAY KRVANA HA IS PAGE PE OR KUCH NHI
    // POSTS UPVOTE COUNT KE SATH ATI HA

    return  <>
    
    
    </>

}

