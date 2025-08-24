import React, { useEffect, useState } from 'react';

import AddProduct from './AddProduct';
import { productsApi } from "../api";
export default function ProductTable() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchProducts = async () => {
        try {
            const res = await productsApi.get('https://684be268ed2578be881cd84b.mockapi.io/apk');

            // Clean data: ensure all required fields exist, set defaults if missing
            const cleanedProducts = res.data.map(product => ({
                id: product.id || '',
                image: product.image || '',
                name: product.name || '',
                category: product.category || '',
                price: product.price || '',
                quantity: product.quantity || '',
                productDetail: product.productDetail || '',
                deliveryCharge: product.deliveryCharge || '',
            }));

            setProducts(cleanedProducts);
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await productsApi.delete(`https://684be268ed2578be881cd84b.mockapi.io/apk/${id}`);
            fetchProducts();
            alert('Product Deleted Successfully');
        } catch (err) {
            console.error('Error deleting product:', err);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleAddClick = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleFormFinish = () => {
        fetchProducts();
        setEditingProduct(null);
        setShowForm(false);
    };
    



    return (
        <div className="container mt-5">
            <h4 className="mb-4">Product List</h4>

            <button className="btn btn-success mb-3" onClick={handleAddClick}>Add New Product</button>

            {showForm && (
                <AddProduct
                    onProductAdded={handleFormFinish}
                    editingProduct={editingProduct}
                    onUpdateFinished={handleFormFinish}
                />
            )}

            <div className="table-container">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Detail</th>
                            <th>Delivery Charge</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td><img src={product.image} alt={product.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} /></td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.productDetail}</td>
                                <td>{product.deliveryCharge}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm mb-1 me-2" onClick={() => handleEdit(product)}>Edit</button>
                                    <button className="btn btn-danger btn-sm mb-1" onClick={() => handleDelete(product.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
