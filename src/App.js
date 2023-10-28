import Footer from "./componets/layout/Footer/Footer";
import Header from "./componets/layout/Header/Header";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import webfont from "webfontloader";
import React, { useEffect, useState } from "react";
import Home from "./componets/Home/Home";
import './App.css'
import ProductDetails from "./componets/Product/ProductDetails";
import Product from "./componets/Product/Product"
import Search from "./componets/Search/Search";
import LoginandRegister from "./componets/layout/User/LoginandRegister";
import store from './store'
import { loaduser, updateprofile } from "./Action/Useraction";
import Useroption from "./componets/layout/Header/Useroption.js"
import { useSelector } from "react-redux";
import Account from './componets/layout/User/Profile';
import Updateprofile from './componets/layout/User/Updateprofile';
import Updatepassword from "./componets/layout/User/Updatepassword";
import Cart from "./componets/Cart/Cart";
import Shipping from "./componets/Cart/Shipping";
import ConfirmOreder from "./componets/Cart/ConfirmOreder";
import Payment from "./componets/Cart/Payment"
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";



function App() {

  const {isAuthenticated,user} =useSelector((state)=>state.user);
  const[stripeApikey,setstripeApikey]=useState("");

  async function getstripekey()

  {
    const {data}=await axios.get(`api/v1/stripekey`)
    setstripeApikey(data.stripeApikey);
  }

  React.useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid sans", "Chilanka"],
      },
    });
    store.dispatch(loaduser())
    setstripeApikey();
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <Useroption user={user} />}
      <Routes>
       
      <Route exact path="/" Component={Home}/>
      <Route exact path="/product/:id" Component={ProductDetails} />
      <Route exact path="/products" Component={Product}/>
      <Route exact path="/products:keyword" Component={Product}/>
      <Route exaxt path="/serach" Component={Search}/>
      <Route exact path="/account" Component={Account}/>
      <Route exact path="Login" Component={LoginandRegister}/>  
      <Route exact path="/me/update" Component={Updateprofile}/> 
      <Route exact path="/password/update" Component={Updatepassword}/> 
      <Route exact path="/cart" Component={Cart}/>
      <Route exact path="login/shipping" Component={Shipping}/>
      <Route extac path="/order/confirm" Component={ConfirmOreder}/>
      
      <Elements stripe={loadStripe(stripeApikey)}>
  <Route path="/payment" element={<Payment />} />
</Elements>

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
