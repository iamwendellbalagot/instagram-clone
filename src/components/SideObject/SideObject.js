import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import {useStateValue} from '../../hoc/stateProvider';
import './SideObject.css';

import Modal from '../Modal/Modal';

const SideObject = ({username, fullname, userPhoto}) => {
    const [{userPosts}, dispatch] = useStateValue();

    const sortArray = (a, b) =>{
        if(a.timestamp < b.timestamp){
            return 1
        }
        else {
            return -1
        }
    }
    return (
        <div className='sideobject'>
            <div className='sideobject__header'>
                <div className='sideobject__header__avatar'>
                    <Avatar
                        src={userPhoto? userPhoto : ''}
                        alt={fullname} 
                        style={{height:'100px', width: '100px'}}>{username}</Avatar>
                    <Modal />
                </div>
                <div className='sideobject__header__user'>
                    <p>{username}</p>
                    <span>{fullname}</span>
                </div>
            </div>
            <div className='sideobject__recentPost'>
                <h3>Recent Post</h3>
                <hr />
                {userPosts[0]?<div className='sideobject__recentPost__contents'>
                    <img
                        src ={userPosts[0]? userPosts.sort(sortArray)[0].imageURL : ''} 
                        alt='Recent Post' />
                    <span>{userPosts[0]? userPosts.sort(sortArray)[0].caption : ''}</span>
                </div>
                :<h1>No recent post</h1>}
            </div>
        </div>
    )
}

export default SideObject
