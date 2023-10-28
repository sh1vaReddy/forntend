import React from "react";
import { useState, Fragment } from "react";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import { saveShippingInfo } from "../../Action/CartAction";
import './Shipping.css';
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import Metadata from "../Metadata";
import { CheckoutSteps } from "./Checkoutstep";
import { useNavigate } from 'react-router-dom';


function Shipping() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const {  shippinginfo } = useSelector((state) => state.cart);
  const [addres, setaddress] = useState( shippinginfo.addres);
  const [city, setcity] = useState( shippinginfo.city );
  const [country, setcountry] = useState( shippinginfo.country );
  const [state, setstate] = useState( shippinginfo.state );
  const [pincode, setpincode] = useState( shippinginfo.pincode );
  const [phone, setphone] = useState( shippinginfo.phone);

  const shippingSubmit = (e) => {
    e.preventDefault();
    
    dispatch ( saveShippingInfo ({addres,city,country,state,pincode}))
    navigate("/order/confirm")

  };
  return (
    <Fragment>
     <Metadata title="Shipping Details"></Metadata>
     <CheckoutSteps activepage={0} />

      <div className="ShippingContainer">
        <div className="ShippingBox">
          <h2 className="ShippingHeading"> Shippping Details</h2>

          <form
            className="ShippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
            <HomeIcon />
            <input
              type="text"
              placeholder="Address"
              required
              value={addres}
              onChange={(e) => setaddress(e.target.value)}
            />
            </div>
            
             <div>

             <LocationCityIcon />
            <input
              type="text"
              placeholder="city"
              required
              value={city}
              onChange={(e) => setcity(e.target.value)}
            />
             </div>
            
            <div>
            <PinDropIcon />
            <input
              type="text"
              placeholder="PhoneNumber" 
              required
              value={pincode}
              onChange={(e) => setpincode(e.target.value)}
            />
            </div>
            
            <div>
              <PhoneIcon />

              <input
                type="number"
                placeholder="PhoneNumber"
                required
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              />
            </div>

            <div>
              <PublicIcon />

              <select
                required
                value={country}
                onChange={(e) => setcountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            {country && (
              <div>
                <TransferWithinAStationIcon />
                <select
                  required
                  value={state}
                  onChange={(e) => setstate(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <input type="submit" value="Continue" className="shippingBtn"  disabled={state ? false : true}/>
            
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Shipping;
