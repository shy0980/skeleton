import { makeRequest } from "./makeRequest"


export function getAllUsers() {
  return makeRequest(`/users`)
}

export function putPost({title, body, atr1, atr2, atr3, atr4}) {
  console.log(title + atr1 + atr2 + atr3 + atr4 )
  return makeRequest(`/signup/post`, {
    method: "POST",
    data: { title, body, atr1, atr2, atr3, atr4 },
  })
}

export function LoginPost({username, password}) {
  return makeRequest(`/login/post` , {
    method: "POST",
    data : {username, password},
  })
}

export function GetMsg({postId}) {
  return makeRequest(`/getMsgPost/${postId}`)
}

export function SendMsg({postId, userId, message}) {
  return makeRequest(`/sendmsg/${postId}/${userId}`, {
    method: "POST",
    data: {message}
  })
}

export function getDetailsPost({postId}) {
  return makeRequest(`/getPostDetails/${postId}`)
}

export function getPosts() {
  return makeRequest("/posts")
}

export function getPost(id, userId) {
  return makeRequest(`/posts/${id}/${userId}`)
}
