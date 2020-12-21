import React, { useEffect, useState } from "react";
import Base from "./Base";
import { loadCart } from "./helper/cartHelper";
import Card from "./Card";
import PaymentB from "./PaymentB";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        {products.map((products, index) => (
          <Card
            key={index}
            product={products}
            removeFromCart={true}
            addtoCart={false}
            reload={reload}
            setReload={setReload}
          />
        ))}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h1>Checkout</h1>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Welcome to Checkout">
      <div className="row">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h4>No Products</h4>
          )}
        </div>
        <div className="col-6">
          {products.length > 0 ? (
            <PaymentB products={products} setReload={setReload}/>
          ) : (
            <h3>Please Login or Add Something in cart</h3>
          )}
        </div>
      </div>
    </Base>
  );
}
