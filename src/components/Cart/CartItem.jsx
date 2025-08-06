import { useDispatch } from "react-redux";
import "./CartItem.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { changeQuantity } from "../../store/slice/CartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleQuantityChange = async (type) => {
    if (type === "increment") {
      dispatch(changeQuantity({ productId: item.productId, value: 1 }));
    } else {
      dispatch(changeQuantity({ productId: item.productId, value: -1 }));
    }
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />

      {/* <div className="details"> */}
      <h3>{item.productName}</h3>
      {/* <p>{item.spec}</p> */}

      <div className="actions">
        <button onClick={() => handleQuantityChange("decrement")}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => handleQuantityChange("increment")}>+</button>
      </div>
      <span className="price">₹{(item.price * item.quantity).toFixed(2)}</span>

      <button className="remove" onClick={() => dispatch()}>
        <RiDeleteBin6Line />
      </button>

      {/* </div> */}
    </div>
  );
};

export default CartItem;
