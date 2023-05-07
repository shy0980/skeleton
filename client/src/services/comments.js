import { makeRequest } from "./makeRequest"
import Cookies from "js-cookie"

const userId = Cookies.get('userId')

export function createComment({ postId, message, parentId=null}) {
  console.log(postId + " " + message + " " + parentId + " " + userId)
  return makeRequest(`posts/${postId}/comments`, {
    method: "POST",
    data: { message, parentId, userId },
  })
}

export function updateComment({ postId, message, id }) {
  return makeRequest(`posts/${postId}/comments/${id}`, {
    method: "PUT",
    data: { message },
  })
}

export function deleteComment({ postId, id }) {
  return makeRequest(`posts/${postId}/comments/${id}`, {
    method: "DELETE",
  })
}

export function toggleCommentLike({ id, postId }) {
  return makeRequest(`/posts/${postId}/comments/${id}/toggleLike`, {
    method: "POST",
    data : { userId }
  })
}
