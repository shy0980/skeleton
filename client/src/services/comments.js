import { makeRequest } from "./makeRequest"

const userId = "3aa85d0f-ee23-45a7-9824-13ad72cd1d2b"

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

export function toggleCommentLike({ id, postId, userId="3aa85d0f-ee23-45a7-9824-13ad72cd1d2b" }) {
  return makeRequest(`/posts/${postId}/comments/${id}/toggleLike`, {
    method: "POST",
    data : { userId }
  })
}
