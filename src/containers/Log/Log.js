import React from 'react';
import './Log.css';


const Log = ({Children}) => {
    return (
        <div className='log'>
            <div className='log__image'>
                <img src='gram__login__photo.png' alt='Background'/>
            </div>
            {/* <LoginForm />  */}
            {Children}
        </div>
    )
}

export default Log
