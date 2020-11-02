import React, {useState, useEffect } from 'react';
import './LoginForm.css';

import { auth } from '../../firebase';


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe =  auth.onAuthStateChanged(userAuth => {
            if(userAuth){
                console.log(userAuth)
            }else{
                console.log('Not logged in')
            }
        })

        return () => {
            unsubscribe();
        }
    }, [])

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
                <span>Sign up</span>
            </div>
        </div>
        
    )
}

export default LoginForm
