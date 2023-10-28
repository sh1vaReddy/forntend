import React, { Fragment } from 'react';
import './Cartiteam.css'
import {Link} from "react-router-dom"

export const Cartitem = ({item,deleteCart}) => {
  return (
    <Fragment>
            <div className='cartCard'>
              <img src={item.image} alt='ssa'></img>
              <div>
                <Link to={`/product/${item.product}`}>
                {item.name}</Link>
                <span>{`price:$${item.price}`}</span>
                <p onClick={() =>deleteCart(item.product)}>remove</p>
              </div>
             

            </div>
    </Fragment>
  )
}
