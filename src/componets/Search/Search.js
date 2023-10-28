import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Search.css"

function Search() {

    const[keyword,setKeyWord]=useState("");
    const history = useNavigate();
    const serachSubmitHandler=(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            history(`/product/${keyword}`)
        }
        else{
            history(`/product`)
        }
    }
  return (
    <Fragment>
        <form className='serachbox' onSubmit={serachSubmitHandler}>
            <input type='text'
            placeholder='Serach a Product..'
            onChange={(e)=>setKeyWord(e.target.value)}/>
            <input type='submit' value="serach"/>
        </form>
    </Fragment>
  )
}

export default Search;