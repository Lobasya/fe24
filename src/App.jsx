

import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import UsersList from './containers/UsersList';
import UserInfo from './containers/UserInfo';
import api from './api';
import {Provider, useDispatch} from './store/context';

let renderCount = 1;

const Application = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      dispatch({type: 'SET_LOADER', payload: {isLoader: false}})
      try {
        const {data} = await api.getUsers()
        dispatch({type: 'GET_USERS', payload: {users: data}})
      } catch (e){
      } finally {
        dispatch({type: 'SET_LOADER', payload: {isLoader: false}})
      }
    }
    fetch();
  }, [])

  return (
      <main>
        <UsersList/>
        <UserInfo/>
      </main>
  );
}

const App = () =>  {
  return <Provider>
            <Application/>
          </Provider>
}

export default App;
