import { Routes, Route } from "react-router-dom"
import { Post } from "./components/Post"
import { PostList } from "./components/PostLists"
import { PostProvider } from "./contexts/PostContext"
import { UserLogin } from "./user/userLogin"
import { NavBar } from "./navBar/navbar"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

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
      </Routes>
    </div>
  )
}

export default App
