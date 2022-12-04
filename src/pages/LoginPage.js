import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

export const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const mounted = useRef()

    const { status } = useSelector((state) => state.auth)
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    if (isAuth) navigate('/')
    
    useEffect(() => {
        if (!mounted.current){
            mounted.current = true
        } else {
            if (status) toast(status)
        }
    }, [status, isAuth])
    

    const handleSubmit = () => {
        try {
            dispatch(loginUser({ username, password }))          
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='form_wrapper'>
      <form onSubmit={(e) => e.preventDefault()} className='form'>
            <h1 className='form_header'>Authorization:</h1>
            <label className='form_label'>
                Username:
                <input  type='text' placeholder='Username' 
                        className='form_input' value={username}
                        onChange={(e) => setUsername(e.target.value)}
                />
            </label>

            <label className='form_label'>
                Password:
                <input  type='password' placeholder='Password' 
                        className='form_input' value={password}
                        onChange={(e) => setPassword(e.target.value)}
                />
            </label>

                <button className='button' onClick={handleSubmit}> Log in </button>
                <div  className='form_footer'><Link to='/register'>Create an account</Link></div>
        </form>

    </div>
  )
}
