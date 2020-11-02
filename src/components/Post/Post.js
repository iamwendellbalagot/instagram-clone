import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { db } from '../../firebase';
import './Post.css';

import Avatar from '@material-ui/core/Avatar';

const Post = ({postUser, postImage, postCaption, postID}) => {

    const [commentBox, setCommentBox] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        db.collection('posts')
        .doc(postID)
        .collection('comments')
        .orderBy('timestamp', 'asc')
        .onSnapshot( snapshot => {
            setComments(snapshot.docs.map(doc => ({
                id: doc.id,
                comment: doc.data()
            })))
        })
    },[])

    // useEffect(() => {
    //     console.log(comments.length + 1)
    //     console.log(comments.slice(0,2))
    // }, [comments])

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        db.collection('posts')
        .doc(postID)
        .collection('comments')
        .add({
            user: 'wendell',
            comment: commentBox,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setCommentBox('');
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
            {/* {comments.length<1? comments?.map(comment =>(
                <p className='post__caption' key={comment.id}><strong>{comment.comment.user}</strong> {comment.comment.comment}</p>
            )): comments?.splice(0,2).map(comment =>(
                <p className='post__caption' key={comment.id}><strong>{comment.comment.user}</strong> {comment.comment.comment}</p>
            ))} */}
            {comments?.map(comment =>(
                <p className='post__caption' key={comment.id}><strong>{comment.comment.user}</strong> {comment.comment.comment}</p>
            ))}
            <form className='post__form' onSubmit={handleCommentSubmit} >
                <input type='text' placeholder='Add a comment...' value={commentBox} onChange={(e) => setCommentBox(e.target.value)} />
                <button type='submit'>Post</button>
            </form>
        </div>
    )
}

export default Post
