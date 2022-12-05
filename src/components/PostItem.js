import React from 'react'
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai'
import Moment from 'react-moment'
import { Link, useNavigate } from 'react-router-dom'
import { removePost } from '../redux/features/posts/postSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'


export const PostItem = ({ post, id }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const removePostHandler = () => {
        try {
            dispatch(removePost(post._id))
            toast('The post has been deleted')
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    if (!post) return <div></div>

    return ( 
        <div className='post_item'>
            <Link to={`/${post._id}`}>

                <div className='post_icon_wrapper'>
                    <div className='post_item_info'>Author: {post.username} </div>
                    <div className='post_item_info'>Published: <Moment date={post.createdAt} format='D MMM YYYY' /></div>
                </div>
                <div className='post_item_title'>{post.title}</div>

                <div className='post_item_image_and_text_wrapper'>
                    <div className={post.imgUrl ? 'post_item_image' : 'hidden'}>
                        {post.imgUrl && (<img alt='img' className='post_item_image_inside' src={`https://mern-blog-backend-api.onrender.com/${post.imgUrl}`}/>)}
                    </div>
                    <div className='post_item_text line-clamp'>{post.text}</div>
                </div>
            </Link>

                <div className='post_item_icons_wrapper'>
                    
                        <button className='post_item_icon'> 
                            <Link to={`/${post._id}`}>
                                <AiFillEye /> 
                                <span>{post.views}</span> 
                            </Link>
                        </button>
                        <button className='post_item_icon'>
                            <Link to={`/${post._id}`}>
                                <AiOutlineMessage />{' '}
                                <span>{post.comments?.length || 0} </span>
                            </Link>
                        </button>

                        {/* These buttons will be displayed only for post's author */}
                        {user?._id === post.author && (
                        <button className='post_item_icon'>
                            <Link to={`/${post._id}/edit`}>
                                <AiTwotoneEdit />
                            </Link>
                        </button>)}
                    {user?._id === post.author && (
                    <button
                        onClick={removePostHandler}
                        className='post_item_icon'
                    >
                        <AiFillDelete />
                    </button>)}
                </div>

            </div>
    )
}