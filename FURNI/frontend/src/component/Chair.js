import React, { useEffect, useState } from 'react';
import { productsApi } from "../api";
import { Link } from 'react-router-dom';

export default function Chair() {

  const [chairs, setChairs] = useState([]);

  useEffect(() => {
    productsApi.get('https://684be268ed2578be881cd84b.mockapi.io/apk')
      .then(response => {
        const chairItems = response.data.filter(product => product.category === 'chair');
        setChairs(chairItems);
      })
      .catch(error => {
        console.error('Error fetching chair data:', error);
      });
  }, []);

  return (
    <div>
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>Chair Category</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="untree_co-section product-section before-footer-section">
        <div className="container">
          <div className="row">
            {chairs.map((product) => (
              <div key={product.id} className="col-12 col-md-4 col-lg-3 mb-5">
                <Link to={`/product/${product.id}`} className="product-item">
                  <img src={product.image} className="img-fluid product-thumbnail" alt={product.title} />
                  <h3 className="product-title">{product.title}</h3>
                  <strong className="product-price">${product.price}</strong>
                  {/* <span className="icon-cross">
                    <img src="images/cross.svg" className="img-fluid" />
                  </span> */}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
