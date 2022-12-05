import React, {useState, useEffect, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { registerUser, checkIsAuth } from '../redux/features/auth/authSlice'
import {toast} from "react-toastify"

export const RegisterPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { status } = useSelector((state) => state.auth)
    const isAuth = useSelector(checkIsAuth)

    const mounted = useRef()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isAuth) navigate('/')
        
        if (!mounted.current){
            mounted.current = true
        } else{
            if (status) toast(status)
        }
    }, [status, isAuth])

    const handleSubmit = () => {
        try {
            dispatch(registerUser({ username, password }))
            setPassword('')
            setUsername('')
        } catch (error) {
            console.log(error)
        }
    }
    
  return ( 
    <div className='form_wrapper'>
      <form onSubmit={(e) => e.preventDefault()} className='form'>
            <h1 className='form_header'>Registration:</h1>
            <label className='form_label'>
                Username:
                <input type='text' placeholder='Username' className='form_input'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>

            <label className='form_label'>
                Password:
                <input type='password' placeholder='Password' className='form_input'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>

                <button className='button' onClick={handleSubmit}>
                    Register
                </button>
                 <div  className='form_footer'><Link to='/login'>Already registered?</Link></div>
        </form>
    </div>
  )
}
