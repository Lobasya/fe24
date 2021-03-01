
export const initialState = {
    infoData: {
      isLoader: false,
      user: null,
      albums: [],
      posts: [],
    },
    users: [],
    isLoader: true,
  }
  
 export const reducer = (state, action) => {
     debugger;
    if (action.type === 'GET_USERS') {
      return {...state, users: action.payload.users}
    }
    if (action.type === 'SET_INFO_USER') {
      return {
        ...state, 
        infoData: {
            ...state.infoData, 
            ...action.payload
          }
      }
    }
    if (action.type === 'SET_LOADER') {
      return {
        ...state, 
        isLoader: action.payload.isLoader
      }
    }
    return state;
  }