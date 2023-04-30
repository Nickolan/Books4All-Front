import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { getUsers } from "../../Redux/actions"
import { useState } from "react";

function UsersBanList({inactiveUsers}) {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme);
    const [currentPage, setCurrentPage] = useState(1)
    const usersForPage = 5;
    const lastUser = currentPage * usersForPage;
    const firstUser = lastUser - usersForPage;
    const currentUsers = inactiveUsers.slice(firstUser, lastUser);
    const pageNumber = [];
 
    for (let i = 1; i <= Math.ceil(inactiveUsers.length / usersForPage); i++) {
        pageNumber.push(i)
    }

    const handleStateChange = (event) => {
        let name = event.target.value
        axios.put(`/admin/state/${name}`)
        .then(() => dispatch(getUsers()))
        .catch((error) => alert(error));
    }

    return (
        <div>
            <div class='d-flex justify-content-around'>
                <div>
                    <h1>Blocked USERS</h1>
                </div>
                <div class='border border-3 d-flex'>
                    <div>
                        <button
                        key="previous"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        class={theme === 'light' ? 'btn btn-sm btn-outline-dark mx-1 fw-bold' : 'btn btn-sm btn-outline-light mx-1 fw-bold'}
                        >
                        &lt;
                        </button>
                    </div>
                    <div>
                        <button
                        key="next"
                        disabled={currentPage === pageNumber.at(-1)}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        class={theme === 'light' ? 'btn btn-sm btn-outline-dark mx-1 fw-bold' : 'btn btn-sm btn-outline-light mx-1 fw-bold'}
                        >
                        &gt;
                        </button>
                    </div>
                </div>
            </div>
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
                {currentUsers?.map((user) => {
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

export default UsersBanList