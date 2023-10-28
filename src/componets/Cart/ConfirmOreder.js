import React from "react";
import { Fragment } from "react";
import { CheckoutSteps } from "./Checkoutstep";
import { useSelector } from "react-redux";
import Metadata from "../Metadata";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import './ConformOrder.css';
import { useNavigate } from 'react-router-dom';
import { json } from "body-parser";

const ConfirmOrder = () => {
  const { shippinginfo, cartItems } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const navigate=useNavigate();




  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const ShippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalprice = ShippingCharges + tax + subtotal;
  const address = `${shippinginfo.addres}, ${shippinginfo.city}, ${shippinginfo.pincode}`;


  const proceedToPayment = () =>
  {
      const data={
        subtotal,
        ShippingCharges,
        tax,
        totalprice
      }
      sessionStorage.setItem("orderinfo",JSON.stringify(data))
      navigate("/payment");
  }

  return (
    <Fragment>
      <Metadata title="Confirm order" />
      <CheckoutSteps activepage={1} />
      <div className="ConfirmOrderpage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.user.name}</span>
              </div>
              <div>
                <p>Phone no:</p>
                <span>{shippinginfo.pincode}</span>
              </div>
              <div>
                <p>Address:</p> 
                <span>{address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="confirmOrder">
          <Typography>Your Cart Items:</Typography>
          <div className="confirmcartcontainer">
            {cartItems && cartItems.map((item) => (
              <div key={item.product}>
                <Link to={`/product/${item.product}`}>
                  {item.name}
                </Link>
                <span>
                  {item.quantity} x ₹{item.price} = {" "}
                  <b>₹{item.price * item.quantity}</b>
                </span>
              </div>
            ))}
            <div>
              <div className="Ordersummary">
                <Typography>
                  <div>
                    <p>subtotal</p>
                    <span>₹{subtotal}</span>
                  </div>
                  <div>
                    <p>Shipping Charges:</p>
                    <span>{ShippingCharges}</span>
                  </div>
                  <div>
                    <p>GST:</p>
                    <span>₹{tax}</span>
                  </div>
                </Typography>
              </div>
            </div>
            <div className="ordersummary">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalprice}</span>
            </div>
            <button  onClick={proceedToPayment}>Payment</button>
            
           
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
