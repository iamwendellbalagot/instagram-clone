import React, {useState} from 'react';
import {useStateValue} from '../../hoc/stateProvider';
import {Link} from 'react-router-dom';
import {auth} from '../../firebase';
import './Signup.css';

const Signup = () => {

    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const [{user}, dispatch] = useStateValue();

    const handleSubmit = event =>{ 
        event.preventDefault();
        dispatch({
            type: 'SET_USERNAME',
            username: username
        })
        dispatch({
        type: 'SET_FULLNAME',
        fullname: fullname
        })
        auth.createUserWithEmailAndPassword(email, password)
        .then( user =>{
            user.user.updateProfile({
                displayName: username + '%20' +fullname 
            })
            .then(res => {
                console.log('Account Created with display name')
            })
            .catch(err => console.log(err.message))
        })
        .catch(err => console.log(err.message))
    }

    return (
        <div className='signup'>
            <div className='signup__container'>
                <img src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' alt='LOGO' />
                <h3>Sign up to see photos and videos from your friends.</h3>
                <form className='signup__form' onSubmit={handleSubmit} >
                    <input 
                        type='email'  
                        placeholder='Type your email here'
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)} />
                    <input 
                        type='text'  
                        placeholder='Fullname'
                        value={fullname} 
                        onChange={(e)=>setFullname(e.target.value)} />
                    <input 
                        type='text'  
                        placeholder='Username'
                        value={username} 
                        onChange={(e)=>setUsername(e.target.value)} />
                    <input 
                        type='password' 
                        placeholder='Password'
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} />
                    <input 
                        type='password' 
                        placeholder='Confirm Password'
                        value={confPassword} 
                        onChange={(e) => setConfPassword(e.target.value)} />
                    
                        
                    <button type='submit'>Sign up</button>
                </form>
            </div>
            <div className='signup__login'>
                <p>Already have an account?</p>
                <Link to='/login' className='signup__login__btn'>Log in</Link>
            </div>            
        </div>
    )
}

export default Signup
