// import { is } from 'immer/dist/internal'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { checkIsAuth, logout } from '../redux/features/auth/authSlice'

export const NavBar = () => {
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    let avatar = '?'
    if (isAuth) {
      avatar = user.avatarUrl 
        ? (<img alt='img' className='avatar_image' src={`http://localhost:5000/${user.avatarUrl}`}/>)
        : user.username.trim().toUpperCase().split('').slice(0, 2)
    }    
    
    const navigate = useNavigate()

    const logoutHandler = () => {
      dispatch(logout())
      window.localStorage.removeItem('token')
      toast('You are logged out')
      navigate('/')
    }

  return (
    <div className='navbar_wrapper'>
        <div className='comment-item-avatar_main'>
                {avatar}
        </div>
        <ul className='navbar'>
            <NavLink to='/' end className={({isActive})=> isActive ? 'active_link' : "navlink"}>Main page</NavLink>
            {isAuth ? <>
                <NavLink to='posts' className={({isActive})=> isActive ? 'active_link' : "navlink"}>My posts</NavLink>
                <NavLink to='add' className={({isActive})=> isActive ? 'active_link' : "navlink"}>Add post</NavLink>
                <NavLink to='user' className={({isActive})=> isActive ? 'active_link' : "navlink"}>Your profile</NavLink>

              </>:<>
                <div className="disabled_link">My posts</div>
                <div className='disabled_link'>Add post</div>
                <div className='disabled_link'>Your profile</div>

            </>}
        </ul>
        {isAuth ? <button className='button' onClick={logoutHandler}>Log out</button> : <Link to={'/login'} className='button'>Login</Link>}
    </div>
  )
}
