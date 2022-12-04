import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PopularPosts } from '../components/PopularPosts'
import { PostItem } from '../components/PostItem'
import { getAllPosts } from '../redux/features/posts/postSlice'

export const MainPage = () => {
    const dispatch = useDispatch()
    const { posts, popularPosts } = useSelector((state) => state.post)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    if (!posts?.length) {
        return (
            <div className='post_no'>There are no posts</div>
        )
    }

    return (
        <div className='post_wrapper'>
            <div className='post-wrapper'>
                <div className='post_main'>
                    {posts?.map((post, idx) => <PostItem key={idx} post={post} />)}
                </div>
                <div className='post_popular'>
                    <div className='post_popular_header'>
                        TOP-3 the most popular posts:
                    </div>

                    {popularPosts?.map((post, idx) => (
                        <PopularPosts key={idx} post={post} />
                    ))}
                </div>
            </div>
        </div>
    )
}