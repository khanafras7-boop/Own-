import {Link} from 'react-router-dom';

export default function ProductCard({product}) {
    return (
        <>
            <div className="product-cart">
                <img src={product.image} className="product-card-image" alt={product.name} />
                <div className="product-card-content">
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                    <div className="product-card-actions">
                        <Link to={`/product/${product.id}`} className="btn btn-secondary">View Details</Link>
                        <button className="btn btn-primary">Add to cart</button>
                    </div>

                </div>
            </div>
        </>
    )
}