import React from 'react'

export const CommentItem = ({ cmt }) => {
    let avatar = cmt.author.avatarUrl 
        ? (<img alt='img' className='avatar_image' src={`https://mern-blog-backend-api.onrender.com/${cmt.author.avatarUrl}`}/>)
        : cmt.author.trim().toUpperCase().split('').slice(0, 2)
    return (
        <div className='comment-item-wrapper'>
            <div className='comment-item-avatar'>
                {avatar}
            </div>
            <div className='comment-item-text'>{cmt.comment}</div>
        </div>
    )
}