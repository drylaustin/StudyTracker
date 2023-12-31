import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    
    const { logout } = useLogout()
    const { user } = useAuthContext()


    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className="container">
                <div className="navTitle">
                <Link to="/">
                    <h1>Study Tracker</h1>
                </Link>
                </div>
                <nav>
                    {user && (
                    <div>
                        <span>{user.email}</span>
                        <button onClick={handleClick}>Log out</button>
                    </div>
                    )}
                    {!user &&( 
                    <div className='log'>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>Signup</Link>
                    </div>)}
                </nav>
            </div>
        </header>
    )
}

export default Navbar