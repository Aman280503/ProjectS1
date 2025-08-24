import  { useEffect, useState } from 'react';
import { productsApi } from "../api";

export default function AddProduct({ onProductAdded, editingProduct, onUpdateFinished }) {
    const [formData, setFormData] = useState({
        image: '',
        name: '',
        category: '',
        price: '',
        quantity: '',
        productDetail: '',
        deliveryCharge: '' 
    });

    useEffect(() => {
        if (editingProduct) {
            setFormData(editingProduct);
        } else {
            setFormData({
                image: '',
                name: '',
                category: '',
                price: '',
                quantity: '',
                productDetail: '',
                deliveryCharge: '' 
            });
        }
    }, [editingProduct]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingProduct) {
                await productsApi.put(`https://684be268ed2578be881cd84b.mockapi.io/apk/${editingProduct.id}`, formData);
                alert('Product Updated Successfully!');
                onUpdateFinished();
            } else {
                await productsApi.post('https://684be268ed2578be881cd84b.mockapi.io/apk', formData);
                alert('Product Added Successfully!');
                onProductAdded();
            }

            setFormData({
                image: '',
                name: '',
                category: '',
                price: '',
                quantity: '',
                productDetail: '',
                deliveryCharge: ''  
            });

        } catch (error) {
            console.error('Error adding/updating product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-3 border mb-4">
            <h4>{editingProduct ? 'Update Product' : 'Add New Product'}</h4>
            <input className="form-control mb-2" type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
            <input className="form-control mb-2" type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
            <input className="form-control mb-2" type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
            <input className="form-control mb-2" type="text" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
            <input className="form-control mb-2" type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
            <textarea className="form-control mb-2" name="productDetail" placeholder="Product Detail" value={formData.productDetail} onChange={handleChange} required />
            <input className="form-control mb-2" type="text" name="deliveryCharge" placeholder="deliveryCharge" value={formData.deliveryCharge} onChange={handleChange} required /> {/* ✅ Added input field */}
            <button className="btn btn-primary" type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
        </form>
    );
}
