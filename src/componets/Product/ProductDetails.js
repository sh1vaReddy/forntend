import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getproductDetails } from "../../Action/Productaction";
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router-dom";
import ReactStars from "react-stars";
import "./productDetails.css";
import Metadata from "../Metadata";
import {addItemsCart} from '../../Action/CartAction'

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.productDetails);
  const params = useParams();
const[quantity,setquantity]=useState(1);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    size: window.innerHeight < 600 ? 20 : 25,
    activacolor: "tomato",
    value: 2.5,
  };

  const incresequantity = () =>
  {
    const qty=quantity+1;
    setquantity(qty)
  }
  
  const decreserquantity = () =>
  {
    if(1 >= quantity)
    {
      return
    }
    const qty=quantity-1;
    setquantity(qty); 
  }
  const addItemsCartHandler = () =>
  {
    dispatch(addItemsCart(params.id,quantity))
  }
  useEffect(() => {
    dispatch(getproductDetails(params.id));
  }, [dispatch, params.id]);
  if (loading || !products) {
    return <p>Loading...</p>;
  }
  return (
    <Fragment>
      <Metadata title={`${products.name}--ECOMMERCE`}></Metadata>
      <div className="ProductDetails">
        <div>
          <Carousel>
            {products.images &&
              products.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  key={i}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel>

          <div className="ProductDetailsBlock-1">
            <h2>{products.name}</h2>
            <p>product # {products._id}</p>
          </div>
          <div className="ProductDetailsBlock-2">
            <ReactStars {...options} />{" "}
            <span>({products.numofReviews} Reviews)</span>
          </div>
          <div className="ProductDetailsBloack-3">
            <h1>{`₹${products.price}`}</h1>
            <div className="ProductDetailsBlock-3-1">
              <button onClick={decreserquantity}>-</button>
              <input readOnly value={quantity} type="number"></input>
              <button onClick={incresequantity}>+</button>
            </div>
            <button onClick={addItemsCartHandler}>Add to Cart</button>
          </div>
          <p>
            Status:
            <b className={products.stock < 1 ? "redcolor" : "greencolor"}>
              {products.stock < 1 ? "OutofStock" : "stock"}
            </b>
          </p>

          <div className="productDetailsBlock-4">
            <h1>Description: </h1>
            <p>{products.description}</p>
          </div>
          <button className="Submit">Submit reviews</button>
        </div>
      </div>

      <h3 className="reviewcard">Reviews</h3>
    </Fragment>
  );
};

export default ProductDetails;
