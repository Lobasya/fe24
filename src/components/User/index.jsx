import React, {useContext} from "react";
import {useDispatch} from '../../store/context';
import api from '../../api';

const User = ({user}) => {
    const dispatch = useDispatch();


    const handlePickUser = async user => {
        dispatch({type: 'SET_INFO_USER', payload: {isLoader: true}})
        try {
          const {data: posts} = await api.getPostsByUserId(user.id);
          const {data: albums} = await api.getAlbumsByUserId(user.id);

          dispatch({type: 'SET_INFO_USER', payload: {isLoader: false, posts, albums, user}})
        } catch(e){
          dispatch({type: 'SET_INFO_USER', payload: {isLoader: false}})
        }
    }

    return (
        <div className="user_card" onClick={() => handlePickUser(user)}>
            <p>Name: {user.name}</p>
            <p>email: {user.email}</p>
        </div>
    )
}

export default User;


// {
//     "id": 1,
//     "name": "Leanne Graham",
//     "username": "Bret",
//     "email": "Sincere@april.biz",
//     "address": {
//       "street": "Kulas Light",
//       "suite": "Apt. 556",
//       "city": "Gwenborough",
//       "zipcode": "92998-3874",
//       "geo": {
//         "lat": "-37.3159",
//         "lng": "81.1496"
//       }
//     },
//     "phone": "1-770-736-8031 x56442",
//     "website": "hildegard.org",
//     "company": {
//       "name": "Romaguera-Crona",
//       "catchPhrase": "Multi-layered client-server neural-net",
//       "bs": "harness real-time e-markets"
//     }
//   }

