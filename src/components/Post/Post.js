import React, { useState } from 'react';
import { db } from '../../firebase';
import './Post.css';

import Avatar from '@material-ui/core/Avatar';

const Post = ({postUser, postImage, postCaption, postID}) => {

    const [commentBox, setCommentBox] = useState('');

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        console.log(commentBox)
        db.collection('posts')
        .doc(postID)
        .collection('comments')
        .add({
            user: 'wendell',
            comment: commentBox
        })
    }

    return (
        <div className='post'>
            <div className='post__header'>
                <Avatar className='post__header__avatar'/>
                <span>{postUser}</span>
            </div>
            <img 
                src={postImage}
                alt='Post' />
            <p className='post__caption'><strong>{postUser}</strong> {postCaption}</p>
            <form className='post__form' onSubmit={handleCommentSubmit} >
                <input type='text' placeholder='Add a comment...' onChange={(e) => setCommentBox(e.target.value)} />
                <button type='submit'>Post</button>
            </form>
        </div>
    )
}

export default Post
