import { useNavigate, Link } from 'react-router-dom'

export default function ControlPanel({setSection}) {
    return (
        <nav className='navbar navbar-dark bg-dark d-flex flex-column justify-content-start padding-left'>
            <div class='position-start'>
                <div>
                    <button onClick={() => setSection('Dashboard')} class='border-0 text-light bg-dark'>DashBoard</button>
                </div>
                <div>
                    <button onClick={() => setSection('Admin')} class='border-0 text-light bg-dark'>Admin</button>
                </div>
                <div>
                    <button onClick={() => setSection('Active Users')} class='border-0 text-light bg-dark'>Active Users</button>
                </div>
                <div>
                    <button onClick={() => setSection('Inactive Users')} class='border-0 text-light bg-dark'>Inactive Users</button>
                </div>
                <div>
                    <button onClick={() => setSection('Active Books')} class='border-0 text-light bg-dark'>Active Books</button>
                </div>
                <div>
                    <button onClick={() => setSection('Inactive Books')} class='border-0 text-light bg-dark'>Inactive Books</button>
                </div>
                <div>
                <Link to={`/formCreateBook`}>
                    <button class='btn btn-success'>Create Book</button>
                </Link>
            </div>
            </div>
        </nav>
    )
}