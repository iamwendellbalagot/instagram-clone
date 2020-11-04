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
  const[{user, username, fullname}, dispatch] = useStateValue();

  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged(userAuth =>{
      if(userAuth){
        let userInfo = userAuth.displayName?.split('%20');
        dispatch({
          type:'SET_USER',
          user:userAuth
        })
        if(userInfo){
          dispatch({
            type: 'SET_USERNAME',
            username: userInfo[0]
          })
          dispatch({
            type: 'SET_FULLNAME',
            fullname: userInfo[1]
          })
        }
      }else{
        console.log('Not Logged in')
      }
    })

    return () => {
      unsubscribe();
    }
  }, [user, fullname])


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
