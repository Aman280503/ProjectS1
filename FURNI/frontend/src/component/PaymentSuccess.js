import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/slice/cart"; // ✅ make sure path is correct

const PaymentSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem("cart");
      dispatch(clearCart());
    }, 0);
  }, [dispatch]);
  

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <FaCheckCircle style={styles.icon} />
        <h1 style={styles.title}>Payment Successful</h1>
        <p style={styles.message}>Thank you for your order!</p>
        <button style={styles.button} onClick={() => window.location.href = "/"}>
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #4BB543, #32CD32)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
  icon: {
    fontSize: "60px",
    color: "#4BB543",
    marginBottom: "20px",
  },
  title: {
    fontSize: "26px",
    marginBottom: "10px",
  },
  message: {
    fontSize: "16px",
    color: "#333",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#4BB543",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default PaymentSuccess;