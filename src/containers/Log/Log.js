import React from 'react';
import './Log.css';

import LoginForm from '../../components/LoginForm/LoginForm';

const Log = () => {
    return (
        <div className='log'>
            <div className='log__image'>
                <img src='gram__login__photo.png' alt='Background'/>
            </div>
            <LoginForm /> 
        </div>
    )
}

export default Log
