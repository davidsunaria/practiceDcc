import React, { useState, useEffect } from 'react';
const Input = (props) => {
  return (
    <React.Fragment>
        <div className="form-label-group">
            <input
              type={props.type}
              className={props.error ? "form-control error" : "form-control"}
              value={props.value}
              onChange={(e) => props.handleInputChange(e)}
              placeholder={props.placeholder}
              id={props.id}
            />
            <label htmlFor={props.id}>{props.label}</label>
            {props.error &&
                <div className="errorMsg">
                  <label>{props.errorMessage}</label>
                </div>
            }
        </div>
    </React.Fragment>
  );
};
export default Input;
