import axios from "axios"
import { useAuth0 } from "@auth0/auth0-react"
function UsersList({users}) {

    const { user, getAccessTokenSilently } = useAuth0();


    const handleStateChange = (event) => {
        let name = event.target.value
        axios.put(`/admin/state/${name}`)
        .then((response) => alert(response.data))
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
                            </div>
                            <div>
                                {user.active === true ? <h4>Active</h4> : <h4>Inactive</h4>}
                                {user.active === true ? <button class="btn btn-danger" value={user.name} onClick={handleStateChange}>Disactivate</button> 
                                : <button class="btn btn-success" value={user.name} onClick={handleStateChange}>Activate</button>}
                                
                            </div>
                            <div class=''>
                                <img src={user.picture} onError='https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png' alt=""/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default UsersList