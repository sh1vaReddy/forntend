import React from 'react';
import Helment from 'react-helmet';


function Metadata({title}) {
  return ( 
   <Helment>
    <title>{title}</title>
   </Helment>
  )
}

export default Metadata