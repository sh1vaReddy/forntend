import React from 'react';
import ReactStars from 'react-stars';
import { Link } from 'react-router-dom';



const Product=({product})=>{
  const options={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    size:window.innerHeight <600 ?20:25,
    activacolor:"tomato",
  value:  product.rating
}
  return(
    <Link className='productCard' to={`/product/${product._id}`}>
    <img src={product.image} alt={product.name}/>
    <p>{product.name}</p>
   <div>
    <ReactStars {...options} /> <span>({product.numofReviews}  Reviews)</span>
   </div>
   <span>{`₹${product.price}`}</span>
 
   
 </Link>
  )
}

export default Product