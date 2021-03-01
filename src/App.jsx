

import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import UsersList from './containers/UsersList';
import UserInfo from './containers/UserInfo';
import api from './api';

const initialState = {
  infoData: {
    isLoader: false,
    user: null,
    albums: [],
    posts: [],
  },
  users: [],
  isLoader: true,

}

const reducer = (state, action) => {
  if (action.type === 'INC') {
    return {count: state.count + 1}
  }
  if (action.type === 'DEC') {
    return {count: state.count - 1}
  }
  return state;
}

let renderCount = 1;

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const fetch = async () => {
      try {
        const {data} = await api.getUsers()
        handlePickUser(data[0])
        setUsers(data)
      } catch (e){

      } finally {
        setIsLoader(false)
      }
    }
    fetch();
  }, [])

  console.log(renderCount++)

  const handlePickUser = async user => {
      setInfoData({isLoader: true})
      try {
        const {data: posts} = await api.getPostsByUserId(user.id);
        const {data: albums} = await api.getAlbumsByUserId(user.id);
        setInfoData({isLoader: false, posts, albums, user})
      } catch(e){
        setInfoData({isLoader: false})
      }
  }

  // return isLoader ? <p>Loading...</p> :(
  //   <main>
  //     <UsersList users={users} handlePickUser={handlePickUser}/>
  //     <UserInfo {...infoData}/>
  //   </main>
  // );
  return (

    <main>
      <div>
        <h1>{state.count}</h1>
        <button onClick={() => dispatch({type: 'INC'})}>+</button>
        <button onClick={() => dispatch({type: 'DEC'})}>-</button>
        <button onClick={() => dispatch({type: 'dskjhhfgsjdgh'})}>Nothing</button>
      </div>
      <UsersList users={users} handlePickUser={handlePickUser}/>
      <UserInfo {...infoData}/>
    </main>
  );
}

export default App;
