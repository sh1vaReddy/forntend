import React, { Fragment } from "react";
import { Cartitem } from "./Cartitem";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { addItemsCart, removeItemsCart } from "../../Action/CartAction";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const Navigate=useNavigate()
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newquty = quantity + 1;
    if (newquty <= stock) {
      dispatch(addItemsCart(id, newquty));
    }
  };

  const decreaseQuantity = (id, quantity, stock) => {
    const newquty = quantity - 1;
    if (newquty >= 1) {
      dispatch(addItemsCart(id, newquty));
    }
  };

  const deleteCart = (id) => {
    dispatch(removeItemsCart(id));
  };


  const checkoutHandler = () =>
  {
    Navigate("/login?redirect=shipping")
  }

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="ProductNotFound">
          <RemoveShoppingCartIcon />
          <Typography>No Product IS Found</Typography>
          <Link to='/products'>View Product</Link>
        </div>
      ) : (
        <div className="cartPage">
          <div className="cartHeading">
            <p>Quantity</p>
            <p>Product</p>
            <p>Subtotal</p>
          </div>
          {cartItems &&
            cartItems.map((item) => (
              <div className="cartContainer" key={item.id}>
                <Cartitem item={item} deleteCart={deleteCart}></Cartitem>
                <div className="cartinput">
                  <button
                    onClick={() =>
                      increaseQuantity(item.id, item.quantity, item.stock)
                    }
                  >
                    +
                  </button>
                  <input readOnly type="number" value={item.quantity} />
                  <button
                    onClick={() =>
                      decreaseQuantity(item.id, item.quantity, item.stock)
                    }
                  >
                    -
                  </button>
                </div>
                <p className="subtotale">{`₹${item.price * item.quantity}`}</p>
              </div>
            ))}
          <div className="cartGrossProfit">
            <div></div>
            <div className="cartGrossProfitBox">
              <p>Gross Profit</p>
              <p>{`₹${cartItems.reduce((acc,item)=>acc+item.quantity * item.price,0)}`}</p>
            </div>
            <div></div>
          </div>
          <div className="Checkoutbtn">
            <button onClick={checkoutHandler}>Check Out</button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Cart;
