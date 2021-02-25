import React from "react";
import User from "../../components/User";

const UsersList = ({users, handlePickUser}) => {
    return (
        <div className="user_list">
            {
                users && users.length ? 
                    users.map(user => {
                        return (
                            <User 
                                user={user}
                                handlePickUser={handlePickUser} 
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


