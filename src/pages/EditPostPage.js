import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updatePost } from '../redux/features/posts/postSlice'
import { toast } from 'react-toastify'

import axios from '../utils/axios'

export const EditPostPage = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [oldImage, setOldImage] = useState('')
    const [newImage, setNewImage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

     //get post from params id from db
    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setTitle(data.title)
        setText(data.text)
        setOldImage(data.imgUrl)
    }, [params.id])

    const submitHandler = () => {
        try {
            const updatedPost = new FormData()
            updatedPost.append('title', title)
            updatedPost.append('text', text)
            updatedPost.append('id', params.id)
            updatedPost.append('image', newImage)
            dispatch(updatePost(updatedPost))
            navigate('/posts')
            toast ("Your post has been changed")
        } catch (error) {
            console.log(error)
        }
    }

    const clearFormHandler = () => {
        navigate('/')
        toast ("You are right! This is the best post and there is no need to change it :)")
    }

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    return (
      <div className='form_wrapper'>
        <form
            className='form'
            onSubmit={(e) => e.preventDefault()}
        >
            <label className='form_add_image'>
                Change image (up to 2 MB)
                <input
                    type='file'
                    className='hidden'
                    onChange={(e) => {
                        if(e.target.files[0].size > 2097152){
                            toast("File is too big!");
                            e.target.files[0] = "";
                         };
                        setNewImage(e.target.files[0])
                        setOldImage('')
                    }}
                />
            </label>
            <div className='flex object-cover py-2'>
                {oldImage && (
                    <img
                        src={`http://localhost:5000/${oldImage}`}
                        alt={oldImage.name}
                        className='post_item_image'
                    />
                )}
                {newImage && (
                    <img
                        src={URL.createObjectURL(newImage)}
                        alt={newImage.name}
                        className='post_item_image'
                    />
                )}
            </div>

            <label className='form_label'>
                Post's title:
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Post's title:"
                    className='form_input'
                />
            </label>

            <label className='form_label'>
                Post`s text:
                <textarea
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    placeholder='Post`s text'
                    className='form_input form_textarea'
                />
            </label>

            <div className='flex gap-8 items-center justify-center mt-4'>
                <button
                    onClick={submitHandler}
                    className='button'
                >
                    Save
                </button>

                <button
                    onClick={clearFormHandler}
                    className='button'
                >
                    Cancel
                </button>
            </div>
        </form>
      </div>
    )
}