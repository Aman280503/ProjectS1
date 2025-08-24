import React, { useEffect, useState } from 'react';
import { productsApi } from "../api";
import { Link } from 'react-router-dom';

export default function Bed() {

  const [beds, setBeds] = useState([]);

  useEffect(() => {
    productsApi.get('https://684be268ed2578be881cd84b.mockapi.io/apk')
      .then(response => {
        console.log(response.data); 
        const bedItems = response.data.filter(product => product.category == 'bed');
        setBeds(bedItems);
      })
      .catch(error => {
        console.error('Error fetching bed data:', error);
      });
  }, []);

  return (
    <div>
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>Bed </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="untree_co-section product-section before-footer-section">
        <div className="container">
          <div className="row">
            {beds.map((product) => (
              <div key={product.id} className="col-12 col-md-4 col-lg-3 mb-5">
                <Link to={`/product/${product.id}`} className="product-item">
                  <img src={product.image} className="img-fluid product-thumbnail" alt={product.name} />
                  <h3 className="product-title">{product.name}</h3> {/* ✅ Yeh fix hai */}
                  <strong className="product-price">${product.price}</strong>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
