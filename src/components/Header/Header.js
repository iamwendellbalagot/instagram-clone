import React from 'react';
import {Redirect} from 'react-router-dom';
import {useStateValue} from '../../hoc/stateProvider';
import {auth} from '../../firebase';
import './Header.css';

import Avatar from '@material-ui/core/Avatar';

const Header = () => {

    const [{user, username}, dispatch] = useStateValue();

    const handleSignOut = () => {   
        auth.signOut()
        dispatch({
            type: 'SET_USER',
            user: null
        })
        window.location.reload();
    }

    return (
        <div className='header'>
            <img 
                src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
                alt='Logo'/>
            <div className='header__user'>
                <button onClick={handleSignOut}>Logout</button>
                <Avatar src={user.photoURL? user.photoURL : ''} style={{fontSize: '10px'}}>{username? username: ''}</Avatar>
            </div>
            
        </div>
    )
}

export default Header
