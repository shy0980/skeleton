import { Routes, Route } from "react-router-dom"
import { Post } from "./components/Post"
import { PostList } from "./components/PostLists"
import { PostProvider } from "./contexts/PostContext"
import { UserLogin } from "./user/userLogin"
import { NavBar } from "./navBar/navbar"
import { UserSignOut } from "./user/userSignout"

function App() {
  return (
    <div className="container">
      <NavBar/>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route
          path="/posts/:id"
          element={
            <PostProvider>
              <Post />
            </PostProvider>
          }
        />
        <Route path="/Login" element={<UserLogin/>} /> 
        <Route path="/Signout" element={<UserSignOut/>}/>
      </Routes>
    </div>
  )
}

export default App
