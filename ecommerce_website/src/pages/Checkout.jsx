import { useCart } from '../context/CartContext';

export default function Checkout() {

    const { getCartItemsWithProducts } = useCart();
    const cartItems = getCartItemsWithProducts();

    return (
        <div className='page'>
            <div className="container">
                <h1 className='page-title'>Checkout</h1>
                <div className="checkout-container">
                    <div className="checkout-items">
                        <h2 className="checkout-section-title">
                            Order Summary
                        </h2>
                        {cartItems.map((item) => (
                            <div className="checkout-item" key={item.id}>
                                <img className='checkout-item-image' src={item.product.image} alt="" />
                                <div className="checkout-item-details" >
                                    <div className="checkout-item-name">{item.product.name}</div>
                                    <p className="checkout-item-price">${item.product.price} each</p>
                                </div>
                                <div className="checkout-item-controls">
                                    <div className="quantity-controls">
                                        <button className='quantity-btn'>-</button>
                                        <span className="quantity-value">{item.quantity}</span>
                                        <button className="quantity-btn">+</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
} 