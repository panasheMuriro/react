import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ProductsPage from "./pages/Products";
import { useCartStore } from "./store/cartStore";
import { RiShoppingCartFill } from "@remixicon/react";
import CartPage from "./pages/Cart";

function App() {
  const items = useCartStore((state) => state.items);

  return (
    <Router>
      <div
        style={{
          backgroundColor: "#00000020",
          height: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 30px",
        }}
      >
        <div></div>
        <h1>Shopping Cart Manager</h1>
        <div style={{ display: "flex" }}>
          <Link to="/cart">
            <button style={{ backgroundColor: "transparent", border: "none" }}>
              <RiShoppingCartFill />
            </button>
          </Link>
          <div>{items.length}</div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
