import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import './Home.css';

import Header from '../../components/Header/Header';
import CreatePost from '../../components/CreatePost/CreatePost';
import Post from '../../components/Post/Post';

const Home = () => {

    const [posts, setPost] = useState([]);

    useEffect(() =>{
        db.collection('posts')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot  => {
            setPost(snapshot.docs.map(doc => ({
                id: doc.id,
                posts: doc.data()
            })))
        })
    }, [])

    return (
        <div className='home'>
            <div className='home__left'>
                <Header />
                <CreatePost />
                {posts?.map(post =>(
                    <Post 
                        postImage={post.posts.imageURL}
                        postUser={post.posts.username}
                        postCaption={post.posts.caption}
                        postID = {post.id}
                        key={post.id} />
                ))}
            </div>
            <div className='home__right'>

            </div>
            
        </div>
    )
}

export default Home;

