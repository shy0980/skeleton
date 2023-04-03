import { makeRequest } from "./makeRequest"

export function getPosts() {
  return makeRequest("/posts")
}

export function getPost(id, userId) {
  return makeRequest(`/posts/${id}/${userId}`)
}
