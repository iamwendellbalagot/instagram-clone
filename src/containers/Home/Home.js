import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import {useStateValue} from '../../hoc/stateProvider';
import './Home.css';

import Header from '../../components/Header/Header';
import CreatePost from '../../components/CreatePost/CreatePost';
import Post from '../../components/Post/Post';
import SideObject from '../../components/SideObject/SideObject';

const Home = () => {

    const [posts, setPost] = useState([]);
    const [{user, username, fullname, userPosts}, dispatch] = useStateValue();

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

    useEffect(() => {
        if(user.uid){
            db.collection('posts')
            .where('userUID', '==', user.uid)
            .get()
            .then(res => { 
               dispatch({
                   type: 'SET__USERPOSTS',
                   posts: (res.docs.map(doc => doc.data()))
               })
            })
        }
        
    }, [user])

    useEffect(() => {
        console.log(userPosts)
    }, [userPosts])

    // useEffect(() => {
    //     if(user.displayName){
    //         let userInfo = user.displayName?.split('%20')
    //         setUsername(userInfo[0]);
    //         setFullname(userInfo[1]);
    //     }
    // }, [user])

    return (
        <div className='home'>
            <div className='home__left'>
                <Header />
                <CreatePost 
                    username={username}
                    uid = {user.uid? user.uid : ''}
                    userPhoto = {user.photoURL? user.photoURL : ''} />
                {posts?.map(post =>(
                    <Post 
                        postImage={post.posts.imageURL}
                        postUser={post.posts.username}
                        postCaption={post.posts.caption}
                        postID = {post.id}
                        username = {username}
                        userPhoto = {post.posts.userPhoto? post.posts.userPhoto: ''}
                        key={post.id} />
                ))}
            </div>
            <div className='home__right'>
                <SideObject 
                    username={username? username: ''}
                    fullname={fullname? fullname: ''}
                    userPhoto = {user.photoURL} />
            </div>
            
        </div>
    )
}

export default Home;

