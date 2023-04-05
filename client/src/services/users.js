import { makeRequest } from "./makeRequest"

const userId = "f1935b9c-1167-4f6e-a7c0-eed84d501ddd"

export function LoginUser({ email, password}) {
  return makeRequest(`/login/user`, {
    method: "POST",
    data: { email, password },
  })
}

