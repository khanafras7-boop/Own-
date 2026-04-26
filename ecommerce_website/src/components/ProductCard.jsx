import {Link} from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({product}) {
    const {cartItems, addToCart} = useCart();
    const productInCart = cartItems.find((item) => item.id === product.id);
    const quantityLabel = productInCart ? `(${productInCart.quantity})` : "";

    return (
        <>
            <div className="product-card">
                <img src={product.image} className="product-card-image" alt={product.name} />
                <div className="product-card-content">
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                    <div className="product-card-actions">
                        <Link to={`/product/${product.id}`} className="btn btn-secondary">View Details</Link>
                        <button onClick={() => addToCart(product.id)} className="btn btn-primary">Add to cart {quantityLabel}</button>
                    </div>

                </div>
            </div>
        </>
    )
}
