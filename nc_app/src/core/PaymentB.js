import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import { Redirect } from "react-router-dom";
import { cartEmpty } from "./helper/cartHelper";
import { getMeToken, processPayment } from "./helper/paymenthelper";
import { createOrder } from "./helper/orderhelper";
import { isAuthenticated, signout } from "../auth/helper/index";

export default function PaymentB({
  products,
  reload = undefined,
  setReload = (f) => f,
}) {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user.id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getMeToken(userId, token).then((info) => {
      console.log(info);
      if (info.error) {
        setInfo({
          ...info,
          error: info.error,
        });
        signout(() => {
          return <Redirect to="/signin" />;
        });
      } else {
        const clientToken = info.clientToken;
        setInfo({
          ...info,
          clientToken: clientToken,
        });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + parseInt(p.price);
    });
    return amount;
  };

  const onPurchase = () =>{
      setInfo({
          ...info,
          loading : true
      })
      let nonce
      let getNonce = info.instance.requestPaymentMethod()
      .then((data)=>{
          console.log(data);
          nonce = data.nonce;
          const paymentData = {
              paymentMethodNonce : nonce,
              amount : getAmount()
          }
          processPayment(userId, token, paymentData)
          .then((response)=>{
              console.log(response);
            if(response.error){
                console.log('Payment Faild');
                signout(()=>{ return <Redirect to="/"/> })
            }else{
                setInfo({
                    ...info,
                    success : response.success,
                    loading : false
                })
                console.log("Payment Success");
                let products_name = ""
                products.forEach((item) => {
                    products_name = products_name + item.name + ", "
                });
                const orderData = {
                    transaction_id : response.transaction.id,
                    product_names : products_name,
                    total_amount : response.transaction.amount
                }
                createOrder(userId, token, orderData)
                .then(responce => {
                    if(response.error){
                        console.log("order faild");
                        signout(()=>{
                            return <Redirect to="/"/>
                        })
                    }else{
                        if(response.error === false){
                            console.log("Order Placed");
                        }
                    }
                })
                .catch(error => {
                    setInfo({
                        ...info,
                        loading : false,
                        success : false
                    })
                    console.log("Order Fail", error.message);
                })
                cartEmpty(()=>{
                    console.log("cart is empty");
                    return <Redirect to="/"/>
                })

                setReload(!reload)
            }
          })
          .catch(error => console.log(error.message))
      })
      .catch((error)=>console.log("NONCE",error.message))
  }

  const showBtnDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button onClick={onPurchase} className="btn btn-block btn-success">Buy Now</button>
          </div>
        ) : (
          <h3>Please Login First or add some thing cart</h3>
        )}
      </div>
    );
  };

  return (
    <div>
      <h3>Your Bill is {getAmount()}</h3>
      {showBtnDropIn()}
    </div>
  );
}
