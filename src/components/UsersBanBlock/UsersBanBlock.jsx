export default function UsersBanBlock ({inactiveUsers}) {
    return (
        <div>
            <div class='container-fluid border border-dark border-3'>
                <div>
                    <h2>Users Blocked:</h2>
                </div>
                <div>
                    <h2>{inactiveUsers.length}</h2>
                </div>
            </div>
        </div>
    )
}