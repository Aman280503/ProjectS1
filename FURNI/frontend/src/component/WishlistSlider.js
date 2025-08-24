// component/WishlistSlider.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removewishitem, toggleWishSlider } from '../store/slice/wishlist';
import { addtocart } from '../store/slice/cart';

export default function WishlistSlider() {
  const { wishitem, wishslider } = useSelector((state) => state.wish);
  const dispatch = useDispatch();

  const closeSlider = () => {
    dispatch(toggleWishSlider(false));
  };

  return (
    <div className={`wishlist-slider ${wishslider ? 'open' : ''}`}>
      <div className="wishlist-header d-flex justify-content-between p-3 border-bottom">
        <h5 className="m-0">My Wishlist ❤️</h5>
        <button className="btn-close" onClick={closeSlider}></button>
      </div>
      <div className="wishlist-body p-3">
        {wishitem.length === 0 ? (
          <p>No items in wishlist</p>
        ) : (
          wishitem.map(item => (
            <div key={item.id} className="mb-3 border-bottom pb-2">
              <img src={item.image} alt={item.name} style={{ width: 60 }} />
              <h6>{item.name}</h6>
              <p className="text-muted">₹{item.price}</p>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-dark" onClick={() => dispatch(addtocart(item))}>Add to Cart</button>
                <button className="btn btn-sm btn-danger" onClick={() => dispatch(removewishitem(item.id))}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
