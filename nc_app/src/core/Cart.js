import React, { useEffect, useState } from "react";
import Base from "./Base";
import { loadCart } from "./helper/cartHelper";
import Card from "./Card";

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
        <div className="col-6">{loadAllProducts(products)}</div>
        <div className="col-6">{loadCheckout()}</div>
      </div>
    </Base>
  );
}
