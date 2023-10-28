import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { Fragment } from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import './Checkout.css'

export const  CheckoutSteps= ({activepage}) => {

    const steps=[
        {
            label:<Typography>Shipping Details</Typography>,
            icon:<LocalShippingIcon/>
        },
        {
            label:<Typography>Confirm Order</Typography>,
            icon:<LibraryAddCheckIcon/>
        },
        {
            label:<Typography>Payment</Typography>,
            icon:<AccountBalanceIcon/>
        }
    ];
    const stepstyle={
        boxSizing: "border-box",
    }
  return (
    <Fragment>
        <Stepper alternativeLabel activeStep={activepage} style={stepstyle}>
           {steps.map((item,index)=>(
            <Step
            key={index} active={activepage === index ? true : false}
            completed={activepage >= index ? true : false}
            >
             <StepLabel
             style={{color:activepage >= index ? "tomato" : "rgba(0, 0, 0, 0.649)"}}
             icon={item.icon}>
                {item.label}
             </StepLabel>

            </Step>
           ))}

        </Stepper>
    </Fragment>
  )
}
