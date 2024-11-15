import { useGetUsersQuery } from "./usersApiSlice"
import User from './User'
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
const UsersList = () => {
    const [searchInput, setSearchInput] = useState('');
   
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }


    if (isSuccess) {

        const { ids, entities } = users

        const filteredIds = ids.filter(userId => entities[userId].username.toLowerCase().includes(searchInput.toLowerCase()) )

        const tableContent = filteredIds?.length ? filteredIds.map(userId => <User key={userId} userId={userId} />)
        : null

        content = (
            <>
            
            <table className="table table--users">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th user__username">Username</th>
                        <th scope="col" className="table__th user__roles">Roles</th>
                        <th scope="col" className="table__th user__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        </>)
        if (!tableContent?.length) {
            content = (
                <p>
                    <h1>No User found</h1>
                    <Link to="/dash/users/new" className="addNotebutton">
                    <h3>Create a new user <FontAwesomeIcon icon={faUserPlus} /></h3></Link>
                    
                </p>
            );
        }
        
    }

    return <>
    <input
     onChange={(e) => setSearchInput(e.target.value)}
     type="text"
     className="table table--notes SearchInput"
     placeholder="Search users"
     />
    {content}
    </>
}
export default UsersList