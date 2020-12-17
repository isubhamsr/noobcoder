import React from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from 'react-router-dom'

const isAuthenticate = true

export default function Card({
  product,
  addtocart = true,
  removeFromCart = false,
}) {
  const cartTitle = product ? product.name : "A title";
  const cartDescription = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "Default price";

  const addToCart = () =>{
      if (isAuthenticate){
          console.log("Added to cart");
        }else{
          console.log("Login Please!");
      }
  }

  const getRedirect = (redirect) =>{
      if(redirect){
          return <Redirect to='/cart'/>
      }
  }

  const showAddToCartButton = (addtocart) =>{
      return(
        addtocart && (
            <button
              onClick={addToCart}
              className="btn btn-block btn-outline-success mt-2 mb-2"
            >
              Add to Cart
            </button>
          )
      )
  }

  const showRemoveFromCartButton = (removeFromCart) =>{
      return(
          removeFromCart && (
            <button
            onClick={() => {console.log("Remove from cart")}}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from Cart
          </button>
          )
      )
  }

  return (
    <div className="card text-white bg-dark border border-info">
      <div className="card-header lead">{cartTitle}</div>
      <div className="card=body">
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cartDescription}
        </p>
        <p className="btn btn-success rounded btn-sm px-4">{cartPrice}</p>
        <div className="row">
          <div className="col-12">
            {showAddToCartButton(addtocart)}
          </div>
          <div className="col-12">
            {showRemoveFromCartButton(removeFromCart)}
          </div>
        </div>
      </div>
    </div>
  );
}
