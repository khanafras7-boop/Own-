import { Link } from 'react-router-dom'
export default function Navbar() {
    return (
        <nav className="navbar">
            <div className='navbar-container'>
                <Link className='navbar-brand' to="/">Home</Link>
                <div className='navbar-links'>
                    <Link to="/auth">Auth</Link>
                    <Link to="/checkout">Checkout</Link>
                </div>
            </div>
        </nav>
    )
}