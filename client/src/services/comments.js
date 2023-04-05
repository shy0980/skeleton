import { makeRequest } from "./makeRequest"

const userId = "f1935b9c-1167-4f6e-a7c0-eed84d501ddd"

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
