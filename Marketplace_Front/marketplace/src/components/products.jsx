import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ cartItems, setCartItems }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState({}); // Nuevo estado para las categorías

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:4000/apiproduct/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            });
            const dataJson = await response.json();
            return dataJson;
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:4000/apicategory/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const dataJson = await response.json();
            const categoriesById = dataJson.reduce((acc, category) => {
                acc[category._id] = category.name;
                return acc;
            }, {});
            setCategories(categoriesById);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
        };

        loadProducts();
    }, []);

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddToCart = (product) => {
        const existingProduct = cartItems.find(item => item.product._id === product._id);

        if (existingProduct) {
            setCartItems(cartItems.map(item =>
                item.product._id === product._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCartItems([...cartItems, { product: product, quantity: 1 }]);
        }
    };

    return (
        <div className="relative">
            <main className="flex-1 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl mb-10 font-bold tracking-tight text-gray-900">Productos</h2>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product._id} className="group">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                    alt={product.name}
                                    src={product.Productimage}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
                            <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                            {product.category && (
                                <p className="mt-1 text-sm text-gray-500">
                                    Categoría: {categories[product.category] || product.category}
                                </p>
                            )}
                            {product.reviews && product.reviews.length > 0 && (
                                <div className="mt-2">
                                    <h4 className="text-sm font-medium text-gray-700">Reseñas:</h4>
                                    <ul className="list-disc pl-5">
                                        {product.reviews.map((review, index) => (
                                            <li key={index} className="text-sm text-gray-600">{review.content}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="mt-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
                            >
                                Agregar al Carrito
                            </button>
                        </div>
                    ))}
                </div>

                <div className='mt-20'>
                    <Link
                        to="/carrito"
                        className="mt-5 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
                    >
                        Ir al Carrito
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default ProductList;
