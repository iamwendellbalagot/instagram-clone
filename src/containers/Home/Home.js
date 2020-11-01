import React from 'react';
import './Home.css';

import Header from '../../components/Header/Header';
import CreatePost from '../../components/CreatePost/CreatePost';
import Post from '../../components/Post/Post';

const Home = () => {
    return (
        <div className='home'>
            <div className='home__left'>
                <Header />
                <CreatePost />
                <Post />
                <Post />
            </div>
            <div className='home__right'>

            </div>
            
        </div>
    )
}

export default Home;

