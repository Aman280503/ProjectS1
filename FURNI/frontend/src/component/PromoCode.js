// PromoCode.js
import React, { useState } from 'react';

export default function PromoCode({ cartTotal }) {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleApplyPromo = () => {
    if (promoCode === 'SAVE101') {
      setDiscount(10);
      alert("Promo code applied: 10% OFF");
    } else {
      setDiscount(0);
      alert("Invalid promo code");
    }
  };

  const finalTotal = cartTotal - (cartTotal * discount) / 100;

  return (
    <div>
      <input
        type="text"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
        placeholder="Enter promo code"
      />
      <button onClick={handleApplyPromo}>Apply</button>
      <div>Discount: {discount}%</div>
      <div><strong>Total: ₹{finalTotal}</strong></div>
    </div>
  );
}
