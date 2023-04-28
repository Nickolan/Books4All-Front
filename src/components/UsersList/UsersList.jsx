import axios from "axios"
import { useDispatch } from "react-redux"
import { getUsers } from "../../Redux/actions"
function UsersList({users}) {
    const dispatch = useDispatch();

    const handleStateChange = (event) => {
        let name = event.target.value
        axios.put(`/admin/state/${name}`)
        .then(() => dispatch(getUsers()))
        .catch((error) => alert(error));
    }
    const makeAdmin = (event) => {
        axios.put('users/admin', {name: event.target.value})
        .then(() => alert('new admin'))
        .catch((error) => alert(error));
    }

    return (
        <div>
            <h1>USERS</h1>
            <div class="border border-2 border-dark d-flex flex-row justify-content-around">
                <div>
                    <h3>Name</h3>
                </div>
                <div>
                    <h3>ID</h3>
                </div>
                <div>
                    <h3>Email</h3>
                </div>
                <div>
                    <h3>Role</h3>
                </div>
                <div>
                    <h3>State</h3>
                </div>
                <div>
                    <h3>Picture</h3>
                </div>
            </div>
            <div>
                {users?.map((user) => {
                    return(
                        <div className="border border-2 border-dark d-flex flex-row justify-content-around">
                            <div>
                                <h4>{user.name}</h4>
                            </div>
                            <div>
                                <h4>{user.id}</h4>
                            </div>
                            <div>
                                <h4>{user.email}</h4>
                            </div>
                            <div>
                                <h4>{user.Roles.at(-1).name}</h4>
                                <button class='btn btn-info' value={user.name} onClick={makeAdmin}>Switch to admin</button>
                            </div>
                            <div>
                                {user.active === false ? <button class="btn btn-danger" value={user.name} onClick={handleStateChange}>Inactive</button> 
                                : <button class="btn btn-success" value={user.name} onClick={handleStateChange}>Active</button>}
                                
                            </div>
                            <div class=''>
                                <img src={user.picture} alt=""/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default UsersList