import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
/* 
{"nickname":"Nickolan","name":"Nicolas Navarrete","picture":"https://avatars.githubusercontent.com/u/112911867?v=4","updated_at":"2023-04-18T15:16:25.800Z","sub":"github|112911867"}
*/
    return (
        
        isAuthenticated && (
            <article className="column">
                <ul>
                    {Object.keys(user).map((objKey, i) => <li key={i}>{objKey}: {user[objKey]}</li>)}
                </ul>
            </article>
        )
    )
}

export default Profile;