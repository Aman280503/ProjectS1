import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { clearUser, setUser } from "./store/slice/auth";
import { auth } from "./component/firebase";
import { onLog } from "firebase/app";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home'
import About from './component/Bed';
import Checkout from './component/Checkout';
import Contact from './component/Contact'
import Shop from './component/Shop';
import ProductDetail from './component/ProductDetail';
import MainLayout from './component/MainLayout';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Service from './component/Service'
import Chair from './component/Chair';
import Cart from './component/Cart';
import Blog from './component/Blog';
import Wishlist from './component/Wishlist';
import Register from './component/Register';
import Login from './component/Login';
import AdminPanel from './component/AdminPanel';
import PaymentSuccess from "./component/PaymentSuccess";
import WishlistSlider from './component/WishlistSlider'; // ✅ GOOD


function App({onLogin}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const [initializedUid, setInitializedUid] = useState(null);

  useEffect(() => {
    if (user && user.uid && user.uid !== initializedUid) {
      onLogin(user.uid);
      setInitializedUid(user.uid);
    }
  }, [user, initializedUid, onLogin]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(setUser({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName || localStorage.getItem(user.uid),
        }));
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
    
  }, [dispatch]);

  return (
    <Router>
    
      <Routes>
        <Route element = {<MainLayout></MainLayout>}>
        <Route path="/" element={<Home />} />
        <Route path="/Bed" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop></Shop>} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout></Checkout>} />
        <Route path="/Sofa" element={<Service></Service>} />
        <Route path="/Chair" element={<Chair></Chair>} />
        <Route path="/Cart" element={<Cart></Cart>} />
        <Route path="/blog" element={<Blog></Blog>} />
        {/* <Route path="/Wishlist" element={<Wishlist></Wishlist>} /> */}
        <Route path="/WishlistSlider" element={<WishlistSlider></WishlistSlider>} />
        </Route>  
        <Route path='/register' element={<Register onLogin={onLogin} />} />
        <Route path='/login' element={<Login onLogin={onLogin} />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/success" element={<PaymentSuccess></PaymentSuccess>}></Route>
        
      </Routes>
    
    </Router>
  );
}

export default App;
