import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
  clearCart,
} from "../store/slice/cart";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51RdtcLIrfBCw41HT0Fw3DUfhTgkdxzQKBa99nzi5kS0UfbAAr8IMopu8I9LsnEHvribE9AarM4YaZlhVBin0sjDu00PbguDPfW"
);

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartitem);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [lockedDiscount, setLockedDiscount] = useState(0);

  const getProductTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  const getDeliveryCharge = () => {
    return cartItems.reduce(
      (acc, item) => acc + Number(item.deliveryCharge || 0),
      0
    );
  };

  useEffect(() => {
    const total = getProductTotal();
    if (total >= 5000 && lockedDiscount === 0) {
      setLockedDiscount(total * 0.1);
    }
  }, [cartItems]);

  const getDiscount = () => {
    return lockedDiscount;
  };

  const getFinalTotal = () => {
    return getProductTotal() + getDeliveryCharge() - getDiscount();
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setLockedDiscount(0); // Reset discount
  };

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      const response = await axios.post(
        "http://localhost:5000/create-checkout-session",
        {
          cartItems: cartItems.map((item) => ({
            title: item.name,
            img_url: item.image,
            discount_price: item.price,
            quantity: item.quantity,
          })),
          customerEmail: "customer@example.com",
        }
      );

      const sessionId = response.data.sessionId;
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        console.error("Stripe redirect error:", result.error.message);
      }
    } catch (error) {
      console.error("Checkout error:", error.message);
    }
  };

  return (
    <div>
      <div className="hero">
        <div className="container">
          <h1>Cart</h1>
        </div>
      </div>

      <div className="untree_co-section before-footer-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12">
              <table className="table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Delivery</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: 70 }}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>₹{item.price}</td>
                      <td>₹{item.deliveryCharge || 0}</td>
                      <td>
                        <div className="input-group" style={{ maxWidth: 120 }}>
                          <button
                            className="btn btn-outline-dark p-3"
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                          >
                            −
                          </button>
                          <input
                            type="text"
                            readOnly
                            className="form-control text-center p-1"
                            value={item.quantity}
                          />
                          <button
                            className="btn btn-outline-dark p-3"
                            onClick={() => dispatch(increaseQuantity(item.id))}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>₹{item.price * item.quantity}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => dispatch(removeProduct(item.id))}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="text-right mt-3">
                <h5>Product Total: ₹{getProductTotal()}</h5>
                <h5>Delivery Charges: ₹{getDeliveryCharge()}</h5>

                {getDiscount() > 0 ? (
                  <h5 className="text-success">
                    10% Discount: -₹{getDiscount().toFixed(0)}
                  </h5>
                ) : (
                  <h6 className="text-muted">
                    🛈 Add products worth ₹5000 or more to get 10% off
                  </h6>
                )}

                <h4 className="mt-3">
                  Final Total: ₹{getFinalTotal().toFixed(0)}
                </h4>

                <button
                  className="btn btn-secondary me-2"
                  onClick={() => navigate("/shop")}
                >
                  Continue Shopping
                </button>

                <button
                  className="btn btn-danger me-2"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>

                <button className="btn btn-dark" onClick={handleCheckout}>
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
