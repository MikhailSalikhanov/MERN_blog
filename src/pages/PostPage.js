import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    AiFillEye,
    AiOutlineMessage,
    AiTwotoneEdit,
    AiFillDelete,
} from 'react-icons/ai'
// import Moment from 'react-moment'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import axios from '../utils/axios'
import { removePost } from '../redux/features/posts/postSlice'
import { checkIsAuth } from '../redux/features/auth/authSlice'

import {
    createComment,
    getPostComments,
} from '../redux/features/comment/commentSlice'
import { CommentItem } from '../components/CommentItem'

export const PostPage = () => {
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState('')
    const isAuth = useSelector(checkIsAuth)

    const { user, username } = useSelector((state) => state.auth)
    const { comments } = useSelector((state) => state.comment)
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    

    const removePostHandler = () => {
        try {
            dispatch(removePost(params.id))
            toast('The post has been deleted')
            navigate('/posts')
        } catch (error) {
            console.log(error)
        }
    }
    console.log(post);
    

    const handleSubmit = () => {
        if (!isAuth) toast('Login to write comments')
        if (isAuth && !comment) {
            toast('Type at least anything :)')
            return
        }
        try {
            const postId = params.id
            const author = user.username
            dispatch(createComment({ postId, comment, author }))
            setComment('')
            toast('Your comment has been added')
        } catch (error) {
            console.log(error)
        }
    }

    const fetchComments = useCallback(async () => {
        try {
            dispatch(getPostComments(params.id))
        } catch (error) {
            console.log(error)
        }
    }, [params.id, dispatch])

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setPost(data)      
    }, [params.id])

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    useEffect(() => {
        fetchComments()
    }, [fetchComments])

        if (!post) {
        return (
            <div className='post_item_title'>
               Loading
            </div>
        )
    }
    if (post?.message) {
            navigate('/404')
    }
    
    return (
        <div className='post_wrapper'>
            <div className='post-wrapper'>
                <div className='post-wrapper-post'>
                      <div className='post_icon_wrapper'>
                          <div className='post_item_info'>Author: {post.username} </div>
                          <div className='post_item_info'>Published: <Moment date={post.createdAt} format='D MMM YYYY' /></div>
                      </div>

                      <div className='post_item_title'>{post.title}</div>
                      <div className={post?.imgUrl ? 'post_item_image_big' : 'hidden'}>
                        {post?.imgUrl && (
                          <img alt='img' className='post_item_image_inside' src={`http://localhost:5000/${post.imgUrl}`}/>)}
                      </div>
                      <p className='post_item_text'>{post.text}</p>

                      <div className='post_item_icons_wrapper'>
                          <button className='post_item_icon'> <AiFillEye /> <span>{post.views}</span> </button>
                          <button className='post_item_icon'>
                              <AiOutlineMessage />{' '}
                              <span>{post.comments?.length || 0} </span>
                          </button>
                          {/* These buttons will be displayed only for post's author */}
                        {user?._id === post.author && (
                                <button className='post_item_icon'>
                                    <Link to={`/${params.id}/edit`}>
                                        <AiTwotoneEdit />
                                    </Link>
                                </button>)}
                        {user?._id === post.author && (
                                <button
                                    onClick={removePostHandler}
                                    className='post_item_icon'
                                >
                                    <AiFillDelete />
                                </button>
                        )}
                      </div>
                </div>
                <div className='comment-wrapper'>
                    <form
                        className='comment-form'
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type='text'
                            value={comment}
                            disabled={!isAuth}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder = {isAuth ? 'Comment' : 'Login to write comments'}
                            className='comment-input'
                        />
                        <button
                            type='submit'
                            onClick={handleSubmit}
                            className='button'
                        >
                            Send
                        </button>
                    </form>
                    {!comments.message ? comments?.map((cmt) => (<CommentItem key={cmt._id} cmt={cmt} />)) : null}
                </div>
            </div>
         </div>
    )
}