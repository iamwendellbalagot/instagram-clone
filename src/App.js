import React, {useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';
import {auth} from './firebase';
import { useStateValue } from './hoc/stateProvider';
import Home from './containers/Home/Home';
import Log from './containers/Log/Log';

import LoginForm from './components/LoginForm/LoginForm';
import Signup from './components/Signup/Signup';

function App() {
  const[{user}, dispatch] = useStateValue();

  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged(user =>{
      if(user){
        dispatch({
          type:'SET_USER',
          user:user
        })
      }else{
        console.log('Not Logged in')
      }
    })

    return () => {
      unsubscribe();
    }
  }, [user])

  useEffect(() =>{
    console.log('APP: ', user)
  },[user])

  return (
    <div className="app">
      <Route exact path='/' >
        {user?<Home />: <Redirect to='/login' />}
      </Route>
      <Route exact path='/login'>
        {user?<Redirect to='/' />: <Log Children={<LoginForm/>}/>}
      </Route>
      <Route exact path='/signup'>
        {user?<Redirect to='/' /> : <Log Children={<Signup/>}/>}
      </Route>
    </div>
  );
}

export default App;
