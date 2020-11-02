import React, {useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {useStateValue} from '../../hoc/stateProvider';
import './LoginForm.css';

import { auth } from '../../firebase';


const LoginForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [{user}, dispatch] = useStateValue();

    // useEffect(() => {
    //     const unsubscribe =  auth.onAuthStateChanged(userAuth => {
    //         if(userAuth){
    //             dispatch({
    //                 type:'SET_USER',
    //                 user:userAuth
    //             })
    //             console.log(userAuth)
    //         }else{
    //             console.log('Not logged in')
    //         }
    //     })

    //     return () => {
    //         unsubscribe();
    //     }
    // }, [user])

    const handleSubmit = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
        .catch(err => console.log(err.message))
        setPassword('')
        setEmail('')
    }

    return (
        <div className='loginform'>
            <div className='loginform__login'>
                <img src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' alt='LOGO' />
                <form className='login__form' onSubmit={handleSubmit} >
                    <input 
                        type='email'  
                        placeholder='Type your email here'
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)} />
                    <input 
                        type='password' 
                        placeholder='Password'
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} />
                    <button type='submit'>Login</button>
                </form>
            </div>
            <div className='loginform__signup'>
                <p>Don't have an account?</p>
                <Link to='/signup' className='loginform__signup__btn'>Sign up</Link>
            </div>
        </div>
        
    )
}

export default LoginForm
