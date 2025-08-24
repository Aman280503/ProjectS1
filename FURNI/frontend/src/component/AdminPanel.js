import  { useState } from 'react';
import AddProduct from './AddProduct';
import ProductTable from './ProductTable';
import AdminFeedbackList from './AdminFeedbackList';

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState('addProduct');

    const refreshPage = () => {
        window.location.reload();
    };

    return (
        <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            {/* Sidebar */}
            <div className="bg-dark text-white p-3" style={{ width: '240px', minHeight: '100vh' }}>
                <h4 className="mb-4 text-center border-bottom pb-2">Admin Dashboard</h4>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <button
                            className={`btn text-start w-100 ${activeTab === 'addProduct' ? 'btn-primary' : 'btn-outline-light'}`}
                            onClick={() => setActiveTab('addProduct')}
                            style={{ borderRadius: '10px' }}
                        >
                            Add Product
                        </button>
                    </li>
                    <li className="nav-item mb-2">
                        <button
                            className={`btn text-start w-100 ${activeTab === 'productTable' ? 'btn-primary' : 'btn-outline-light'}`}
                            onClick={() => setActiveTab('productTable')}
                            style={{ borderRadius: '10px' }}
                        >
                            Product Table
                        </button>
                    </li>
                    <li className="nav-item mb-2">
                        <button
                            className={`btn text-start w-100 ${activeTab === 'feedback' ? 'btn-primary' : 'btn-outline-light'}`}
                            onClick={() => setActiveTab('feedback')}
                            style={{ borderRadius: '10px' }}
                        >
                            User Feedback
                        </button>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="container py-4" style={{ flex: 1 }}>
                {activeTab === 'addProduct' && (
                    <>
                        <h2 className="mb-4 border-bottom pb-2">Add Product</h2>
                        <AddProduct onProductAdded={refreshPage} />
                    </>
                )}

                {activeTab === 'productTable' && (
                    <>
                        <h2 className="mb-4 border-bottom pb-2">Product Table</h2>
                        <ProductTable />
                    </>
                )}

                {activeTab === 'feedback' && (
                    <>
                        <h2 className="mb-4 border-bottom pb-2">User Feedback</h2>
                        <AdminFeedbackList />
                    </>
                )}
            </div>
        </div>
    );
}
