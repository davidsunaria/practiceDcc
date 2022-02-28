import React, { useState, useEffect } from 'react';
const Button = (props) => {

  const [btnClass, setBtnClass] = useState("btn btn-lg btn-primary btn-block text-uppercase");
  const [loadingMsg, setLoadingMsg] = useState("Processing...");

  return (
    <React.Fragment>
      <button type="button" className={btnClass} onClick={() =>  props.onClick()}>
        {props.disableBtn ? loadingMsg : props.label}
        {props.disableBtn &&
          <div className="spinner-border " role="status">
            <span className="sr-only">Loading...</span>
          </div>
        }
      </button>
    </React.Fragment>
  );
};
export default Button;
