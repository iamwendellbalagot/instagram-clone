import React from 'react';
import './Header.css';

import Avatar from '@material-ui/core/Avatar';

const Header = () => {

    return (
        <div className='header'>
            <img 
                src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
                alt='Logo'/>
            <div className='header__user'>
                <button>Logout</button>
                <Avatar />
            </div>
            
        </div>
    )
}

export default Header
