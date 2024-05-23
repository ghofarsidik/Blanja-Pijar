import React from 'react';
import './radioRole.css'

const RadioRole = ({handleToggle}) => {
  return (
    <form>
      <fieldset>
        <div className="radio-block" role="radiogroup" aria-labelledby="animation-effects">
          <input 
            type="radio" 
            name="animations" 
            id="animations-on"
            value="1"
            onClick={() => handleToggle(1)}
            defaultChecked
          />
          <label htmlFor="animations-on">Customer</label>
          <input 
            type="radio" 
            name="animations" 
            id="animations-off" 
            value="2"
            onClick={() => handleToggle(2)}
          />
          <label htmlFor="animations-off" className="off-label">Seller</label>
          <span className="selected" aria-hidden="true"></span>
        </div>
      </fieldset>
    </form>
  );
}

export default RadioRole;