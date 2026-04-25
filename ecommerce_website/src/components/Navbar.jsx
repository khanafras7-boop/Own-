import { Link } from 'react-router-dom'
export default function Navbar() {
    return (
        <nav className="navbar">
            <div className='navbar-container'>
                <Link className='navbar-brand' to="/">ShopHub</Link>
                <div className='navbar-links'>
                    <Link className='navbar-link' to="/auth">Auth</Link>
                    <Link className='navbar-link' to="/checkout">Checkout</Link>
                </div>
                <div className='navbar-auth'>
                    <div className='navbar-auth-links'>
                        <Link className='btn btn-secondary' to="/auth">Login</Link>
                        <Link className='btn btn-primary' to="/auth">Sign Up</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}