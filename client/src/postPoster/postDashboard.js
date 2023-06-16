import Cookies from "js-cookie"

export function PostProfile() {
    console.log(Cookies.get('postId'))

    return <>
        THIS IS POST PROFILE
    </>
}