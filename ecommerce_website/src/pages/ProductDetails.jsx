import { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetails () {
    const {id} = useParams();
    const numericId = parseInt(id);
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    const {cartItems, addToCart} = useCart();


    useEffect(() => {

        const findProduct = getProductById(numericId);
        console.log(findProduct);
        if(!findProduct) {
            navigate('/');
            return;
        }
        
        setProduct(findProduct);

    }, [numericId])

    if(!product) {
        return <h1>.....Loading</h1>
    }

    
    const ProductInCart = product ? cartItems.find((item) => item.id === numericId) : null;

    const QuantityLabel = ProductInCart ? `(${ProductInCart.quantity})` : "";


    return (
        <div className='page'>
            <div className="container">
                <div className="product-detail">
                    <img src={product.image} alt={product.name} />
                    <div className="product-detail-content">
                        <h1 className='product-detail-name'>{product.name}</h1>
                        <p className='product-detail-price'>${product.price}</p>
                        <p className='product-detail-description'>{product.description}</p>
                        <button onClick={() => addToCart(numericId)} className='btn btn-primary'>Add to cart {QuantityLabel}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}