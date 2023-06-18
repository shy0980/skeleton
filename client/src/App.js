import { Routes, Route } from "react-router-dom"
import { Post } from "./components/Post"
import { PostList } from "./components/PostLists"
import { PostProvider } from "./contexts/PostContext"
import { UserLogin } from "./user/userLogin"
import { NavBar } from "./navBar/navbar"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { UserSignup } from "./user/userSignup"
import { UserProfile } from "./user/userDashboard"
import { PostLogin } from "./postPoster/postLogin"
import { PostSignup } from "./postPoster/postSignup"
import { PostProfile } from "./postPoster/postDashboard"
import { SendMsgPost } from "./postPoster/sendMsg"

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={
          <>
            <NavBar/>
            <PostList />
          </>
        } />
        <Route
          path="/posts/:id"
          element={
            <>
              <NavBar/>
              <PostProvider>
                <Post />
              </PostProvider>
            </>  
          }
        />
        <Route path="/Login" element={<UserLogin/>} /> 
        <Route path="/Signup" element={<UserSignup/>}/>
        <Route path="/Profile" element={<UserProfile/>}/>
        <Route path="/PostLogin" element={<PostLogin/>}/>
        <Route path="/PostSignup" element={<PostSignup/>}/>
        <Route path="/PostProfile" element={<PostProfile/>}/>
        <Route path="/PostSendMsg" element={<SendMsgPost/>}/>
      </Routes>
    </div>
  )
}

export default App
