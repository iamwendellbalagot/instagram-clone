import React, {useState, useEffect} from 'react';
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
    const [errorMsg, setErrorMsg] = useState(false);
    const [btnStatus, setBtnstatus] = useState(false);

    const [{user}, dispatch] = useStateValue();

    useEffect(() =>{
        if(username.trim().length !== 0 && fullname.trim().length !==0
            && password.trim().length > 5 && confPassword.trim().length > 5){
                setBtnstatus(true);
        }else{
            setBtnstatus(false);
        }
    }, [email, password,confPassword, fullname, username])

    const handleSubmit = event =>{ 
        event.preventDefault();
        if(password !== confPassword){
            setErrorMsg('auth/password-not-matched');
            return 
        }
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
            .catch(err => console.log(err))
        })
        .catch(err => {
            setErrorMsg(err.code)
        })
    }

    return (
        <div className='signup'>
            <div className='signup__container'>
                <img src='logo_insta.png' alt='LOGO' />
                <h3>Sign up to see photos and videos from your friends.</h3>
                <form className='signup__form' onSubmit={handleSubmit} >
                    <input 
                        type='email'  
                        placeholder='Type your email here'
                        className = {errorMsg==='auth/email-already-in-use'? 'error' : ''}
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
                        className={errorMsg==='auth/password-not-matched'? 'error' : ''}
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} />
                    <input 
                        type='password' 
                        placeholder='Confirm Password'
                        className={errorMsg==='auth/password-not-matched'? 'error' : ''}
                        value={confPassword} 
                        onChange={(e) => setConfPassword(e.target.value)} />
                    
                        
                    <button disabled={!btnStatus} type='submit'>Sign up</button>
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
