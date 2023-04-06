import { makeRequest } from "./makeRequest"

export function LoginUser({ email, password}) {
  return makeRequest(`/login/user`, {
    method: "POST",
    data: { email, password },
  })
}

