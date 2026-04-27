import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function Navbar() {
    const {user, logout, mode, changeMode} = useAuth();
    return (
        <nav className="navbar">
            <div className='navbar-container'>
                <Link className='navbar-brand' to="/">ShopHub</Link>
                <div className='navbar-links'>
                    <Link className='navbar-link' to="/auth">Auth</Link>
                    <Link className='navbar-link' to="/checkout">Cart</Link>
                </div>
                <div className='navbar-auth'>
                    {!user 

                    ?
                    <div className='navbar-auth-links'>
                        {
                        mode == 'login'
                        ?
                            <Link onClick={changeMode} className='btn btn-secondary' to="/auth">Sign Up</Link>
                        :
                            <Link onClick={changeMode} className='btn btn-primary' to="/auth">Login</Link>
                        }
                        
                    </div>
                    : 
                    <div className='navbar-auth-links'>
                        <div className="navbar-user">
                            <span>Hello {user.email}</span>
                        </div>
                        <Link className='btn btn-secondary' onClick={logout} to="/auth">Logout</Link>
                    </div>
                    
                    }
                    
                </div>
            </div>
        </nav>
    )
}