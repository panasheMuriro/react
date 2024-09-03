import { useCartStore } from "../store/cartStore";

export default function ProductCard(props) {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const [selected, setSelected] = useState(props.item.selected);

  const handleCartItem = () => {
    if (!selected) {
      addItem({...props.item, selected:true});
    } else {
      removeItem(props.item.id);
    }
    setSelected(!selected);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        padding: 20,
        marginRight: 20,
        marginBottom: 10,
        width: 300,
      }}
    >
      <img src={props.item.image} height={200}></img>
      <div>{props.item.description.substring(1, 100)}...</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>Price: {props.item.price}</div>
        <button
          style={{
            color: selected? "black": "white",
            backgroundColor: selected? "#00000020":"black",
            padding: 10,
            borderRadius: 10,
          }}
          onClick={handleCartItem}
        >
          {selected ? "Remove from cart" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
