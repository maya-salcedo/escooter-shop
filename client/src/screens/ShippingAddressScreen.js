import { useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps"

const ShippingAddressScreen = () => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    //To Do: dispatch save shipping address
  }
  return(
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input 
            type="text" 
            id="fullName" 
            placeholder="Enter full name" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input 
            type="text" 
            id="address" 
            placeholder="Enter Address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input 
            type="text" 
            id="city" 
            placeholder="Enter City" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input 
            type="text" 
            id="postalCode" 
            placeholder="Enter Postal Code" 
            value={postalCode} 
            onChange={(e) => setPostalCode(e.target.value)} 
            required
          ></input>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input 
            type="text" 
            id="country" 
            placeholder="Enter Country"
            value={country} 
            onChange={(e) => setCountry(e.target.value)} 
            required
          ></input>
        </div>
        <div>
          <label />
          <button className="primary">Continue</button>
        </div>
      </form>
    </div>
  );
};

export default ShippingAddressScreen;