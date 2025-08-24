import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsApi } from "../api";
import { feedbackApi } from "../api";
import { useDispatch } from 'react-redux';
import { addtocart } from '../store/slice/cart';
import { addwish } from '../store/slice/wishlist';

export default function ProductDetail() {

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        productsApi.get(`https://684be268ed2578be881cd84b.mockapi.io/apk/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });
    }, [id]);

    const handleAddToCart = () => {
        dispatch(addtocart({ ...product, quantity: 1 }));
        navigate('/cart');
    };

    const handleWishlist = () => {
        dispatch(addwish(product));
        navigate('/shop');
    };

    const handleSubmitFeedback = async (e) => {
        e.preventDefault();

        if (!feedback || !email || !username) {
            alert('Please fill all feedback fields!');
            return;
        }

        try {
            await feedbackApi.post('https://68230c9bb342dce8005070e5.mockapi.io/furni', {
                userName: username,
                userEmail: email,
                productName: product.name,
                image: product.image,
                feedback: feedback,
                createdAt: new Date().toISOString()
            });

            alert('Feedback submitted successfully!');
            setFeedback('');
            setEmail('');
            setUsername('');
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Error submitting feedback');
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 text-center">
                    <img src={product.image} alt={product.name} className="img-fluid rounded" style={{ maxHeight: '400px' }} />
                </div>

                <div className="col-md-6 d-flex flex-column justify-content-center">
                    <h1 className="mb-4">{product.name}</h1>
                    <h3 className="text-success mb-4">Price: ${product.price}</h3>
                    <p className="mb-4">{product.productDetail}</p>

                    <button onClick={handleAddToCart} className="btn btn-primary btn-lg w-50">
                        Add to Cart 🛒
                    </button>
                    <button onClick={handleWishlist} className="btn btn-primary btn-lg w-50 mt-2">
                        Wishlist 💖
                    </button>
                </div>
            </div>

            {/* ✅ Feedback Form */}
            <div className="row mt-5">
                <div className="col-md-8 offset-md-2">
                    <h3 className="mb-4">Give Your Feedback for {product.name}</h3>
                    <form onSubmit={handleSubmitFeedback}>
                        <div className="form-group mb-3">
                            <label>Your Name</label>
                            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="form-group mb-3">
                            <label>Your Email</label>
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group mb-3">
                            <label>Your Feedback</label>
                            <textarea className="form-control" rows="4" value={feedback} onChange={(e) => setFeedback(e.target.value)} required></textarea>
                        </div>
                        <button type="submit" className="btn btn-success">Submit Feedback</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
