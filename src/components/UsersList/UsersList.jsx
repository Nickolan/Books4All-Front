import axios from "axios"
import { useAuth0 } from "@auth0/auth0-react"
function UsersList({users}) {

    const { user, getAccessTokenSilently } = useAuth0();


    const handleCheckboxChange = (event) => {
        let name = event.target.value
        axios.put(`/admin/state/${name}`)
        .then((response) => alert(response.data))
    }

    const handleBlockUser = async (event) => {

        let userId = event.target.value

        try {
          // Obtain an Access Token for the Management API
          const accessToken = await getAccessTokenSilently({
            audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
            scope: 'read:users update:users'
          });
    
          // Block the user by updating their user metadata
          const response = await fetch(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${userId}`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_metadata: { blocked: true } })
          });
    
          if (response.ok) {
            console.log(`User ${userId} blocked successfully`);
          } else {
            console.error(`Failed to block user ${userId}`);
          }
        } catch (error) {
          console.error(error);
        }
      };

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
                                <input value={user.name} type="checkBox" onChange={handleCheckboxChange}/>
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