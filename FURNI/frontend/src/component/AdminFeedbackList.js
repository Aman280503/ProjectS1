import  { useEffect, useState } from 'react';
import { feedbackApi } from "../api";

export default function AdminFeedbackList() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [selectedFeedbacks, setSelectedFeedbacks] = useState([]);

    // ✅ Fetch Feedbacks
    const fetchFeedbacks = async () => {
        try {
            const res = await feedbackApi.get('https://68230c9bb342dce8005070e5.mockapi.io/furni');
            setFeedbacks(res.data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    // ✅ Handle Checkbox Toggle
    const handleCheckboxChange = (id) => {
        if (selectedFeedbacks.includes(id)) {
            setSelectedFeedbacks(selectedFeedbacks.filter(itemId => itemId !== id));
        } else {
            setSelectedFeedbacks([...selectedFeedbacks, id]);
        }
    };

    // ✅ Delete Selected Feedbacks
    const handleDeleteSelected = async () => {
        if (selectedFeedbacks.length === 0) {
            alert('Please select at least one feedback to delete.');
            return;
        }

        const confirmDelete = window.confirm('Are you sure you want to delete selected feedback(s)?');
        if (!confirmDelete) return;

        try {
            await Promise.all(
                selectedFeedbacks.map(id =>
                    feedbackApi.delete(`https://68230c9bb342dce8005070e5.mockapi.io/furni/${id}`)
                )
            );

            // ✅ After delete, refresh the list    
            fetchFeedbacks();
            setSelectedFeedbacks([]);
            alert('Selected feedback(s) deleted successfully.');
        } catch (error) {
            console.error('Error deleting feedbacks:', error);
            alert('Error deleting feedbacks.');
        }
    };

    return (
        <div className="container">
            <h4 className="mb-4">User Feedback</h4>
            {feedbacks.length === 0 ? (
                <p>No feedback found.</p>
            ) : (
                <>
                    <button
                        className="btn btn-danger mb-3"
                        onClick={handleDeleteSelected}
                        disabled={selectedFeedbacks.length === 0}
                    >
                        Delete Selected
                    </button>
                    <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <table className="table table-bordered table-striped table-sm" style={{ fontSize: '14px' }}>
                            <thead className="table-dark">
                                <tr>
                                    <th>Select</th>
                                    <th>id</th>
                                    <th>User Name</th>
                                    <th>User Email</th>
                                    <th>Product Name</th>
                                    <th>Feedback</th>
                                    <th>Image</th>
                                    <th>Date & Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedbacks.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedFeedbacks.includes(item.id)}
                                                onChange={() => handleCheckboxChange(item.id)}
                                            />
                                        </td>
                                        <td>{index + 1}</td>
                                        <td>{item.userName}</td>
                                        <td>{item.userEmail}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.feedback}</td>
                                        <td>
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt="Feedback"
                                                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                                />
                                            ) : (
                                                'No Image'
                                            )}
                                        </td>
                                        <td>{new Date(item.createdAt).toLocaleString('en-IN', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            hour12: true
                                        })}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}