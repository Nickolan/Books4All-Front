function AdminsList({admins}) {

    return (
        <div>
            <h1>ADMINS</h1>
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
                    <h3>Picture</h3>
                </div>
            </div>
            <div>
                {admins?.map((admin) => {
                    return(
                        <div className="border border-2 border-dark d-flex flex-row justify-content-around">
                            <div>
                                <h4>{admin.name}</h4>
                            </div>
                            <div>
                                <h4>{admin.id}</h4>
                            </div>
                            <div>
                                <h4>{admin.email}</h4>
                            </div>
                            <div>
                                <h4>{admin.Roles.at(-1).name}</h4>
                            </div>
                            <div class=''>
                                <img src={admin.picture} onError='https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png' alt=""/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AdminsList