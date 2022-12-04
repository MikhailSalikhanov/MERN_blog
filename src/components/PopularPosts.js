import React from 'react'
import { Link } from 'react-router-dom'

export const PopularPosts = ({ post }) => {
    return (
        <div className='popularPost_item'>
            <Link to={`${post._id}`}className='popularPost_item_text'>{post.title}</Link>
        </div>
    )
}