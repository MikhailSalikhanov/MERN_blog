import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../redux/features/posts/postSlice'
import { toast } from 'react-toastify'

export const AddPostPage = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = () => {
        try {
            const data = new FormData()
            data.append('title', title)
            data.append('text', text)
            data.append('image', image)
            dispatch(createPost(data))
            navigate('/')
            toast ("Your post has been added")
        } catch (error) {
            console.log(error)
        }
    }
    const clearFormHandler = () => {
        setText('')
        setTitle('')
        setImage('')
        toast ("Ok! Let`s start from the beginning :)")
    }

    return (
      <div className='form_wrapper'>
        <form className='form' onSubmit={(e) => e.preventDefault()}>
            <label className='form_add_image'>
                Add image (up to 2 MB)
                <input type='file' className='hidden' accept="image/*" 
                        onChange={(e) => {
                            if(e.target.files[0].size > 2097152){
                                toast("File is too big!");
                                e.target.files[0] = "";
                             };
                            setImage(e.target.files[0])
                        }
                        } />
            </label>
            <div className='flex object-cover py-2'>
                {image && (
                    <img src={URL.createObjectURL(image)} alt={image.name} className='post_item_image' />
                )}
            </div>

            <label className='form_label'>
                Post's title:
                <input  type='text' value={title} onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Post's title" className='form_input'/>
            </label>

            <label className='form_label'>
                Post`s text:
                <textarea
                    onChange={(e) => setText(e.target.value)} value={text}
                    placeholder='Post`s text' className='form_input form_textarea'/>
            </label>

            <div className=''>
                <button onClick={submitHandler} className='button'> Add post</button>
                <button onClick={clearFormHandler}  className='button'> Clear</button>
            </div>
        </form>
      </div>
    )
}