import { getProducts } from "../data/products"
export default function Home () {
    const products = getProducts();
    return (
        <div className="page">

            <div className="home-hero">
                <h1 className="home-title">Welcome to ShopHub</h1>
                <p className="home-subtitle">Discover amazing products at great prices</p>
            </div>

            <div className="container">
                <h2 className="page-title">Our Products</h2>
                <div className="products-grid">
                    {
                        products.map((product) => (
                            <div className="product-cart" key={product.id}>
                                <img src={product.image} className="product-card-image" alt="" />
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}