export default function UsersBlock ({users}) {
    return (
        <div>
            <div class='container-fluid border border-dark border-3'>
                <div>
                    <h2>Users:</h2>
                </div>
                <div>
                    <h2>{users.length}</h2>
                </div>
            </div>
        </div>
    )
}