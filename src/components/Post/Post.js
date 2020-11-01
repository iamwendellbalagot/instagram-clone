import React from 'react';
import './Post.css';

import Avatar from '@material-ui/core/Avatar';

const Post = () => {
    return (
        <div className='post'>
            <div className='post__header'>
                <Avatar className='post__header__avatar'/>
                <span>Username</span>
            </div>
            <img 
                src='https://i.guim.co.uk/img/media/11d4c182d094199e26ddb36febe67123a9bbc93a/34_246_2966_4275/master/2966.jpg?width=300&quality=45&auto=format&fit=max&dpr=2&s=7eb0ab5367140724ef58182973ba5633'
                alt='Post' />
            <form className='post__form'>
                <input type='text' placeholder='Add a comment...'/>
                <button type='submit'>Post</button>
            </form>
        </div>
    )
}

export default Post
