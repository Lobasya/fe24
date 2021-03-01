import React, {useContext, useReducer} from 'react';
import {reducer, initialState} from '../store/reducer';

export const StoreContext =  React.createContext(null)


export const useDispatch = () => {
    const {dispatch} = useContext(StoreContext)
    return dispatch;
}

export const useSelector = (cb) => {
    const {state} = useContext(StoreContext);

    return cb(state);
}

export const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    )
}