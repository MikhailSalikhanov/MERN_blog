import { Layout } from "./components/Layout";
import { Routes, Route } from 'react-router-dom'
import { MainPage } from "./pages/MainPage";
import { PostsPage } from "./pages/PostsPage";
import { PostPage } from "./pages/PostPage";
import { AddPostPage } from "./pages/AddPostPage";
import { EditPostPage } from "./pages/EditPostPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage } from "./pages/ProfilePage";
import {NotFound} from "./pages/NotFound"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./redux/features/auth/authSlice";


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])
  
  console.log(window.screen.width);
  
  if (window.screen.width < 1024) {  
    return <div className="post_wrapper">
      <p className="post_item_title">This site currently has only desktop version.</p>
      <p className="post_item_text">If you want to see, how the author handle with responsive page, you can visit for example <a className="underline" href="https://mikhailsalikhanov.github.io/PetProjectSite/" target="blank">THIS PAGE</a></p>
    </div>
  }
  
  return (
    <Layout>
        <Routes>
            <Route path='/' element={<MainPage/>} ></Route>
            <Route path='posts' element={<PostsPage/>} ></Route>
            <Route path=':id' element={<PostPage/>} ></Route>
            <Route path='add' element={<AddPostPage/>} ></Route>
            <Route path=':id/edit' element={<EditPostPage/>} ></Route>
            <Route path='login' element={<LoginPage/>} ></Route>
            <Route path='register' element={<RegisterPage/>} ></Route>
            <Route path='user' element={<ProfilePage/>} ></Route>
            <Route path='404' element={<NotFound />}></Route>
        </Routes>

        <ToastContainer position="bottom-right"/>
    </Layout>
  );
}

export default App;
