import React from 'react';
import './footer.css';
import Appstore from '../../../images/Appstore.png';
import playstore from '../../../images/playstore.jpg'

function Footer() {
  return (
    <div className='footer'> 
    <div className='left-footer'>
    <h4>DOWNLOAD OUR APP</h4>
    <p>Download App from Android and IOS</p>
    <img src={playstore} alt='Playstore'/>
     <img src={Appstore} alt='Appstore'/>
    </div>
    <div className='mid-footer'>
     <h1>App</h1>
     <p>High quality is our highest pripority</p>
     <p>Copyrights 2021 &copy;DP</p>
    </div>
    <div className='right-footer'>
      <h1>Follow us</h1>
      <h4>Facebook</h4>
      <h4>Instagram</h4>
      <h4>Tweet</h4>
    </div>
    </div>
  )
}

export default Footer