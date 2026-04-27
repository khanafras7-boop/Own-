import { useCart } from '../context/CartContext';

export default function Checkout() {

    const { getCartItemsWithProducts, clearCart, getCartTotal, updateQuantity, removeFromCart } = useCart();
    const cartItems = getCartItemsWithProducts();
    const total = getCartTotal();

    function PlaceOrder() {
        alert('Order Placed');
        clearCart();
    }

    return (
        <div className='page'>
            <div className="container">
                <h1 className='page-title'>Checkout</h1>
                <div className="checkout-container">
                    <div className="checkout-items">
                        <h2 className="checkout-section-title">
                            Order Summary
                        </h2>
                        {!cartItems.length 
                        ? 
                        <h2 style={{color:"Black"}}>There are no Items in cart</h2> 
                        :
                        (
                            cartItems.map((item) => (
                            <div className="checkout-item" key={item.id}>
                                <img className='checkout-item-image' src={item.product.image} alt="" />
                                <div className="checkout-item-details" >
                                    <div className="checkout-item-name">{item.product.name}</div>
                                    <p className="checkout-item-price">${item.product.price} each</p>
                                </div>
                                <div className="checkout-item-controls">
                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className='quantity-btn'>-</button>
                                        <span className="quantity-value">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="quantity-btn">+</button>
                                    </div>
                                </div>
                                <p className='checkout-item-total'>${(item.product.price * item.quantity).toFixed(2)}</p>
                                <button onClick={() => removeFromCart(item.id)} className='btn btn-secondary btn-small'>Remove Item</button>
                            </div>
                        )))}
                        
                    </div>

                    <div className="checkout-summary">
                        <h2 className='checkout-section-title'>Total</h2>
                        <div className="checkout-total">
                            <p className="checkout-total-label">Subtotal :</p>
                            <p className="checkout-total-value">${total.toFixed(2)}</p>
                        </div>
                        <div className="checkout-total">
                            <p className="checkout-total-label">Total</p>
                            <p className="checkout-total-value checkout-total-final">
                                ${total.toFixed(2)}
                            </p>
                        </div>
                        <button onClick={PlaceOrder} className='btn btn-large btn-block btn-primary '>
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
} 