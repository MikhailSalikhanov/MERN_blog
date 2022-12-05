import React, {useState, useEffect, useCallback} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { updateUser } from '../redux/features/auth/authSlice'
import { getMe } from '../redux/features/auth/authSlice'
import {toast} from "react-toastify"
import axios from '../utils/axios'

export const ProfilePage = () => {
    const { user } = useSelector((state) => state.auth)    
    const [newImage, setNewImage] = useState('')
    const dispatch = useDispatch()

     //get updated user from db
    const fetchUser = useCallback(async () => {
        try {
            dispatch(getMe(user._id))
        } catch (error) {
            console.log(error);
        }
    }, [user?._id])
    
    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    const username = user?.username  

    const handleSubmit = () => {
        try {
            const updatedUser = new FormData()
            updatedUser.append('username', username)
            updatedUser.append('image', newImage)
            dispatch(updateUser(updatedUser))
            setNewImage('')
            toast("Your profile has been changed")            
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleCancel = () => {
        try {
            setNewImage('')
            toast ("You are right! Your current photo is the best :)")
        } catch (error) {
            console.log(error)
        }
    }
    
  return ( 
    <div className='profile_page'>
        <div className='info_wrapper'>
            <div className='form_header'>Your profile information:</div>
            <div className='profile_info_item'>Your name (login): {username}</div>
            <div className='profile_info_item'>Your photo (avatar):</div>
            <div className='avatar_profile'>
                    {user?.avatarUrl ? <img alt='img' className='avatar_image' src={`https://mern-blog-backend-api.onrender.com/${user?.avatarUrl}`}/> : <div>{user.username.trim().toUpperCase().split('').slice(0, 2)}</div>}
            </div>
        </div>
        <div className='form_wrapper'>
        <form onSubmit={(e) => e.preventDefault()} className='form'>
                <h1 className='form_header'>Change your profile photo:</h1>
                
                <label className='form_add_image'>
                    Upload new photo (up to 2MB)
                    <input
                        type='file'
                        accept="image/*"
                        className='hidden'
                        onChange={(e) => {
                            if(e.target.files[0].size > 2097152){
                                console.log(e);
                                
                                toast("File is too big!");
                                e.target.files[0] = "";
                             };
                            setNewImage(e.target.files[0])
                        }}
                    />
                </label>
                {newImage && (
                    <div className={'avatar_profile'}>
                            <img
                                src={URL.createObjectURL(newImage)}
                                alt={newImage.name}
                                className='avatar_image'
                            />
                        </div> 
                    )}
                    {newImage &&
                        <div className='profile_page'>
                            <button className='button' onClick={handleSubmit}>
                                Save
                            </button> 
                            <button className='button' onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>}
            </form>
        </div>
    </div>
        
  )
}
