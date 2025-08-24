import  { useState } from 'react';

import { feedbackApi } from "../api";
export default function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        productName: '',
        image: '', // Image URL
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await feedbackApi.post('https://68230c9bb342dce8005070e5.mockapi.io/furni', {
                id: Date.now(),
                userName: `${formData.firstName} ${formData.lastName}`,
                userEmail: formData.email,
                productName: formData.productName,
                image: formData.image,
                feedback: formData.message,
                createdAt: new Date().toISOString()
            });

            alert('Feedback submitted successfully!');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                productName: '',
                image: '',
                message: '',
            });
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Error submitting feedback');
        }
    };

    return (
        <div>
            <div className="untree_co-section">
                <div className="container">
                    <div className="block">
                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-8 pb-4">
                                <h4 className="mb-4">Contact Us</h4>

                                {/* ✅ User Instruction */}
                                <p className="text-muted mb-4">
                                    Please upload your image to <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer">imgbb.com</a> or a similar service and paste the direct image URL below.
                                </p>

                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="text-black" htmlFor="firstName">First name</label>
                                                <input type="text" className="form-control" id="firstName" value={formData.firstName} onChange={handleChange} required />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="text-black" htmlFor="lastName">Last name</label>
                                                <input type="text" className="form-control" id="lastName" value={formData.lastName} onChange={handleChange} required />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="text-black" htmlFor="email">Email address</label>
                                        <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} required />
                                    </div>

                                    <div className="form-group mb-4">
                                        <label className="text-black" htmlFor="productName">Product Name</label>
                                        <input type="text" className="form-control" id="productName" value={formData.productName} onChange={handleChange} required />
                                    </div>

                                    <div className="form-group mb-4">
                                        <label className="text-black" htmlFor="image">Image URL</label>
                                        <input type="text" className="form-control" id="image" value={formData.image} onChange={handleChange} placeholder="Paste your image URL here" required />
                                    </div>

                                    <div className="form-group mb-4">
                                        <label className="text-black" htmlFor="message">Message</label>
                                        <textarea className="form-control" id="message" cols={30} rows={5} value={formData.message} onChange={handleChange} required />
                                    </div>

                                    <button type="submit" className="btn btn-primary-hover-outline">Send Message</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
