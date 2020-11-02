import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import {useStateValue} from '../../hoc/stateProvider';
import './Home.css';

import Header from '../../components/Header/Header';
import CreatePost from '../../components/CreatePost/CreatePost';
import Post from '../../components/Post/Post';

const Home = () => {

    const [posts, setPost] = useState([]);
    const [{user}, dispatch] = useStateValue();
    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('');

    useEffect(() =>{
        db.collection('posts')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot  => {
            setPost(snapshot.docs.map(doc => ({
                id: doc.id,
                posts: doc.data()
            })))
        })

        let userInfo = user.displayName.split('%20')
        setUsername(userInfo[0]);
        setFullname(userInfo[1]);
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
                <h2>{username? username: null}</h2>
            </div>
            
        </div>
    )
}

export default Home;

