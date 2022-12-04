import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PopularPosts } from '../components/PopularPosts'
import { PostItem } from '../components/PostItem'
import { getAllPosts } from '../redux/features/posts/postSlice'

export const NotFound = () => {
    return (
        <div className='post_item_title'>
            404 page not found
        </div>
    )
}