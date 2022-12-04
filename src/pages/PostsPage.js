import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { PostItem } from '../components/PostItem'
import axios from '../utils/axios'
import { Link } from 'react-router-dom'

export const PostsPage = () => {
    const [posts, setPosts] = useState('posts')

    const fetchMyPosts = async () => {
        try {
            const { data } = await axios.get('/posts/user/me')
            setPosts(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMyPosts()
    }, [])

    if (posts=='posts') return <div></div>

    return (
        <div className='myPosts_wrapper'>

            {(posts?.length) ? posts.map((post, idx) => (
                <PostItem post={post} key={idx} />
            )) : <div className='post_no'><p>You haven`t wrote any posts yet</p>
            <Link to={`/add`}><button className='button' >Try</button></Link>
            </div>}
        </div>
    )
}