import React,{Fragment,useEffect,useRef} from 'react';
import { CheckoutSteps } from './Checkoutstep';
import { useSelector,useDispatch } from 'react-redux';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Typography } from '@mui/material';

const Payment = () => {
 
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
  
    
  
  
    const submithandler = () =>
    {
       
    }
  
    const paybtn =useRef(null);
  return (
    <Fragment>
      <CheckoutSteps activepage={2}/>
      <div className='paymentContainer'>
        <form className='paymentForm' onSubmit={(e)=>submithandler(e)}>
         <Typography>
             Card Info
         </Typography>
         <div>
          <div> 
            <CreditCardIcon/>
            <CardNumberElement/>
          </div>
          <div>
            <EventIcon/>
            <CardExpiryElement/>
          </div>
          <div>
            <VpnKeyIcon/>
            <CardCvcElement/>
          </div>
          

         </div>
         <input 
         type='submit'
         value={`pay-${orderInfo && orderInfo.totalprice}`}
         ref={paybtn}
          className="paymentfrom"
         />

        </form>

      </div>
    </Fragment>
  )
}

export default Payment