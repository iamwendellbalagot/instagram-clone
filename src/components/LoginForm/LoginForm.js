import React from 'react';
import './LoginForm.css';


const LoginForm = () => {
    return (
        <div className='loginform'>
            <div className='loginform__login'>
                <img src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' alt='LOGO' />
                <form className='login__form'>
                    <input type='email' placeholder='Type your email here' />
                    <input type='password' placeholder='Password' />
                </form>
            </div>
            <div className='loginform__signup'>

            </div>
        </div>
        
    )
}

export default LoginForm
