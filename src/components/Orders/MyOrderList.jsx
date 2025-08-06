const MyOrderList = (props) => {
  const { totalAmount, orderDate, status, items, address } = props.value;
  console.log(items);
  return (
    <div className="my-order-list">
      <div>
        <p>
          Order date:{" "}
          <span>{orderDate.split("T")[0].split("-").reverse().join("-")}</span>
        </p>
        <div className="payment-status">
          <p>
            Order Status: <span>{status}</span>
          </p>
        </div>
      </div>
      <div className="my-orders-product">
        <p>Order items: </p>
        {items?.map((item) => {
          return (
            <div className="my-order-product-list">
              <p>{item.productName}</p>
              <span>x{item.quantity}</span>
            </div>
          );
        })}
      </div>
      <p>
        Total price: <span>{totalAmount}</span>
      </p>
      <div className="shipped-address">
        <p>Shipped address:</p>
        <span>
          {address.name}, {address.address},{address.city},{address.state},
          {address.pincode},{address.phone}
        </span>
      </div>
    </div>
  );
};

export default MyOrderList;
