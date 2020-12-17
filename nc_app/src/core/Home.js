import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "./helper/coreApiCalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getAllProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
        console.log(data);
      }
    });
  }, []);

  return (
    <Base title="Home Page" description="Welcome to store">
      <div className="row">
        {products.map((item, index) => (
          <div key={index} className="col-4 mb-4">
            <Card product={item}/>
          </div>
        ))}
      </div>
    </Base>
  );
}
