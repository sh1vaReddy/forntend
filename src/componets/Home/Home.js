import React, { Fragment, useEffect } from 'react';
import { CgMouse} from "react-icons/cg";
import './Home.css';
import Product from './ProductCard'
import {getproduct} from '../../Action/Productaction';
import {useDispatch,useSelector}  from "react-redux";
import Loader from './Loader';
import Metadata from '../Metadata';
function Home() {
  const dispatch=useDispatch();
  const {loading,products}=useSelector(state=>state.products)

  useEffect(()=>{
     dispatch(getproduct())
  },[dispatch])
  return (
   <Fragment>
    <Metadata title={'HOME PAGE'}></Metadata>
    {loading ? Loader: <Fragment>
    <div className="banner">
      <h1>Welcome to Ecommerce</h1>
      <button>
        <CgMouse></CgMouse>
        Scroll</button>
    </div>

    <div className='productheading'>
      <h1>Feature Product</h1>
      
    </div>
    <div className="container" id="container">
        {products && products.map (product=>(
          <Product product={product}/>
        ))}
      </div>
    </Fragment>}
   
   
   </Fragment>
  )
}

export default Home;