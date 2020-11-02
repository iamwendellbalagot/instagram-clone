import React from 'react';
import './Log.css';

import LoginForm from '../../components/LoginForm/LoginForm';
import Signup from '../../components/Signup/Signup';

const Log = () => {
    return (
        <div className='log'>
            <div className='log__image'>
                <img src='gram__login__photo.png' alt='Background'/>
            </div>
            {/* <LoginForm />  */}
            <Signup />
        </div>
    )
}

export default Log
