

import React, { useState, useEffect } from 'react';
import './App.css';
import UsersList from './containers/UsersList';
import UserInfo from './containers/UserInfo';
import api from './api';


const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const [infoData, setInfoData] = useState({
    isLoader: false,
    user: null,
    albums: [],
    posts: [],
  });

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

  console.log(infoData)

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

  return isLoader ? <p>Loading...</p> :(
    <main>
      <UsersList users={users} handlePickUser={handlePickUser}/>
      <UserInfo {...infoData}/>
    </main>
  );
}

export default App;
