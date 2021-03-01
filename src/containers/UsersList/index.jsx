import React, {useContext} from "react";
import User from "../../components/User";
import {useSelector} from '../../store/context';

const UsersList = () => {
    const users = useSelector(state => state.users)

    return (
        <div className="user_list">
            {
                users && users.length ? 
                users.map(user => {
                        return (
                            <User 
                                user={user}
                                key={'userCard_'+user.id}
                            />
                        )
                    }) : 
                    <span>Users not found</span>
            }
        </div>
    )
}

export default UsersList;


