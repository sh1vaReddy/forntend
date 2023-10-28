import React, { Fragment, useState } from 'react';
import './Header.css';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { SpeedDialAction, Tooltip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ListIcon from '@mui/icons-material/List';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Backdrop from '@mui/material/Backdrop';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../Action/Useraction';
import zIndex from '@mui/material/styles/zIndex';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';



const Useroption = ({user}) => {
  const dispatch=useDispatch();
  const history=useNavigate();

  const[open,setOpen]=useState(false)
    const option=[
      {icon:<ListIcon/>,name:"order",func:orders},
      {icon:<ExitToAppIcon/>,name:"Logout",func:logoutuser},
      {icon:<PersonIcon/>,name:"account",func:account},
      {icon:<ShoppingCartIcon/>,name:"Cart",func:Cart}
    ];

    if(user.role==="admin")(
      option.unshift({icon:<DashboardIcon/>,name:"Dashborad",func:Dashboard})
    );

    function Dashboard()
    {
      history("/dashbord")
    }

    function orders ()
    {
      history("/orders")
    }

    function  logoutuser ()
    {
     dispatch(logout());
    } 

    function  account ()
    {
      history("/account")
    }

    function Cart ()
    {
      history("/cart")
    }

  return (
    <Fragment>
      <Backdrop open={open} style={{zIndex:"10"}}/>
      <SpeedDial  ariaLabel ="SpeedDial tooltip example"
      onClose={()=>setOpen(false)}
      onOpen={()=> setOpen(true)}
      open={open}
      style={{zIndex:"11"}}
      direction='left'
      className='speedDial'
      icon={
        <img
        className='speedDialIcon'
        src={user.avatra ? user.avatra : "/profile.png"}
        alt='Profile'
        />
      }
      >
      {option.map((item)=>(
        <SpeedDialAction icon={item.icon}tooltipTitle={item.name} onClick={item.func} tooltipOpen={window.innerWidth<=600 ? true :false}></SpeedDialAction>
      ))}
      </SpeedDial>
    </Fragment>
  )
}

export default Useroption;