import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removewishitem } from '../store/slice/wishlist';
import { addwish} from '../store/slice/wishlist'; // ✅ your cart slice

export default function Wishlist() {
  const wishlistItems = useSelector((state) => state.wish.wishitem);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistItemsadd = (item) => {
    dispatch(addwish({ ...item, quantity: 1 })); 
    navigate('/cart');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">❤️ My Wishlist ❤️</h2>

      {wishlistItems.length === 0 ? (
        <p className="text-center">No items in wishlist</p>
      ) : (
        <div className="row">
          {wishlistItems.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="card h-100 shadow-sm position-relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="card-img-top"
                  style={{ height: '300px', margin: 'auto' }}
                />
                <div className="card-body text-center">
                <h5 className="card-title">{item.category}</h5>
                  <h5 className="card-title">{item.name}</h5>
                  <h5 className="card-title">{item.quantity}</h5>
                  <p className="card-text text-muted">Price: ₹{item.price}</p>
                  <p className="card-text text-muted">{item.deliveryCharge}</p>
                  <p className="card-text text-muted">{item.productDetail}</p>

                  <button
                    className="btn btn-danger mt-2 me-2"
                    onClick={() => dispatch(removewishitem(item.id))}
                  >
                    Remove from Wishlist
                  </button>

                  <button
                    className="btn btn-dark mt-2"
                    onClick={() => wishlistItemsadd(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
