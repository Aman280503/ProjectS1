import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate, Link } from 'react-router-dom';
import { setUser } from '../store/slice/auth';
import { useDispatch } from 'react-redux';
export default function Register({onLogin}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            alert('Registration Successful');
            navigate('/');
            onLogin(userCredential.uid);
            dispatch(setUser(userCredential));
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)' }}>
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}>
                <h2 className="text-center mb-4">Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control form-control-lg rounded-pill"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control form-control-lg rounded-pill"
                            placeholder="Mobile"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control form-control-lg rounded-pill"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control form-control-lg rounded-pill"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="d-grid mb-3">
                        <button type="submit" className="btn btn-primary btn-lg rounded-pill">Register</button>
                    </div>
                    <div className="text-center">
                        <span>Already have an account? </span>
                        <Link to="/login" className="text-decoration-none fw-bold text-primary">Login Here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
