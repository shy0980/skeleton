import { makeRequest } from "./makeRequest"

export function LoginUser({ email, password}) {
  return makeRequest(`/login/user`, {
    method: "POST",
    data: { email, password },
  })
}

export function SignupUser({ email, password, name, etc1=1, etc2="-1", etc3="-1"}) {
  console.log("email: "+email)
  console.log("password: "+password)
  return makeRequest(`/signup/${email}`, {
    method: "POST",
    data: { email, password, name, etc1, etc2, etc3 },
  })
}