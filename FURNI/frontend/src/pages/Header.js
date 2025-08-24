import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../component/firebase'; // Correct path
import { signOut } from 'firebase/auth'; // Correct
import { useDispatch } from 'react-redux';
import { toggleWishSlider } from '../store/slice/wishlist'; // make sure path is correct



export default function Header() {
  const cartItems = useSelector((state) => state.cart.cartitem);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logout Successful');
      navigate('/login');
      window.location.reload(); // Refresh the page
    } catch (error) {
      alert(error.message);
    }
  };
  

  return (
    <div>
      <nav className="custom-navbar navbar navbar-expand-md navbar-dark bg-dark" aria-label="Furni navigation bar">
        <div className="container">
          <NavLink className="navbar-brand" to="/">Furni<span>.</span></NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarsFurni">
            <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">

              <li className="nav-item">
                <NavLink className="nav-link" to="/">Home</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/shop">Shop</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/Bed">Bed</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/Sofa">Sofa</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/Chair">Chair</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/blog">Blog</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">Contact us</NavLink>
              </li>
            </ul>

            <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">

             {user ? (
  <>
    <li className="nav-item me-3 d-flex align-items-center">
      <span className="nav-link fs-6 btn btn-danger btn-sm p-2.5">Hi, {user.displayName}</span>
    </li>
    <li className="nav-item">
      <button
        onClick={handleLogout}
        className="btn nav-link bg-transparent border-0 p-0"
        style={{ outline: 'none', boxShadow: 'none' }}
        title="Logout"
      >
        <img
          width="37"
          height="37"
          src="images/logout-door.png"
          alt="Logout"
        />
      </button>
    </li>
  </>
) : (
  <li className="nav-item">
    <NavLink className="nav-link" to="/login">
      <img
        width="27"
        height="27"
        src="images/user.svg"
        alt="Login"
      />
    </NavLink>
  </li>
)}


             
            
<li className="nav-item">
  <button
    className="btn nav-link bg-transparent border-0 p-0"
    onClick={() => dispatch(toggleWishSlider(true))}
    style={{ outline: 'none', boxShadow: 'none' }}
  >
    <img
      width="37"
      height="37"
      src="images/fav.png"
      alt="Wishlist"
    />
  </button>
</li>


              <li className="nav-item" style={{ position: 'relative' }}>
                <NavLink className="nav-link" to="/cart">
                  <img src="images/cart.svg" alt="Cart" />
                  {cartItems.length > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-2px',
                      right: '-4px',
                      
                      color: 'red',
                     
                      
                      padding: '1px 5px',
                      fontSize: '16px'
                    }}>
                      {cartItems.length}
                    </span>
                  )}
                </NavLink>
              </li>
             
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
