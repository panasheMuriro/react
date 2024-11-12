import ProductCard from "../components/ProductCard";
import { useCartStore } from "../store/cartStore";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  return <div style={{display: "flex"}}>
    {items.map((x, index)=> <ProductCard  key={index} item={x}/>)}
  </div>;
}
