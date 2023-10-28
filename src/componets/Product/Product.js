import React, { Fragment, useEffect, useState } from "react";
import "./product.css";
import { useDispatch, useSelector } from "react-redux";
import { getproduct } from "../../Action/Productaction";
import ProductCard from "../Home/ProductCard";
import Loader from "../Home/Loader";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { Rating, Typography } from "@mui/material";




const categoryies=[
  "Laptop",
  "FootWear",
  "Bottom",
  "Tops",
  "Camera",
  "SmartPhone"
]

const Product = () => {
  const dispatch = useDispatch();
  const parama=useParams();
  const [curentPage,setCurentPage]=useState(1);
  const[price,setprice]=useState([0,25000]);
  const[category,setcategory]=useState("");

  const { loading, products,resultpage,productscount,filterProductsCOunt} = useSelector((state) => state.products);
  
  const keyword=parama.keyword; 

  const setCurentPageNo= (e) =>{
    setCurentPage(e)
  }

  const priceHandler = (event,newprice)=>{
    setprice(newprice);
  }

  useEffect(() => {
    dispatch(getproduct(keyword,curentPage,price,category));
  }, [dispatch,keyword,curentPage,price,category]);


  let count=filterProductsCOunt;


  return (
    <Fragment>  
       <diV className="product-heading">
          {" "}
          <h1>Products</h1>
        </diV>
      <div className="container" id="container">
       

        {products &&
          products.map((product) => <ProductCard  key={product._id} product={product} />)}
      </div>


      

     <div className="filterBox">
      <Typography>Price</Typography>
      <Box>
        <Slider
        value={price}
        onChange={priceHandler}
        valueLabelDisplay="auto"
        aria-labelledby="range-silder"
        min={ 0}
        max={2500}
        ></Slider>
      </Box>
      <Typography>Category</Typography>
      <ul className="categoryBox">
        {categoryies.map((category)=>(
          <li  
          className="category-link"
          key={category}
          onClick={()=>setcategory(category)}
          >
          {category}
            
          </li>
        ))}
        </ul>

        

     </div>

      {resultpage < count && (
          <div className="PagetionBox">
          <Pagination
          activePage={curentPage}
          itemsCountPerPage={resultpage}
          totalItemsCount={productscount}
          onChange={setCurentPageNo}
          nextPageText="next"
          prevPageText="prev"
          firstPageText="1st"
          lastPageText="last"
          itemClass="page-item"
          linkClass="page-link"
          activeClass="pageIteamActive"
          activeLinkClass="pageLinkclass"
          />
        </div>
      )}
    </Fragment>
  );
};

export default Product;
