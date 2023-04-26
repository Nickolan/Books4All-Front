export default function AdminBlock ({Admins}) {
    return (
        <div>
            <div class='container-fluid border border-dark border-3'>
                <div>
                    <h2>Admins:</h2>
                </div>
                <div>
                    <h2>{Admins.length}</h2>
                </div>
            </div>
        </div>
    )
}