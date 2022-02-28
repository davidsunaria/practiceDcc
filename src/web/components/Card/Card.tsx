import React, { useState, useEffect } from 'react';
import CardBody from "tt-frontend-components/Card/CardBody.tsx";
import Button from "tt-frontend-components/Button/Button.tsx";
const Card = (props) => {

  return (
    <React.Fragment>
      <div className="card bg-light">
        <div className="card-body">
          <h6 className="card-title text-uppercase text-truncate py-2">{props.type}</h6>
          <div className="items border border-light">
           {props && props.data.map((obj, idx) => {
             return(
                <CardBody 
                  key={'card-'+idx} 
                  bodyObj={obj} 
                  parentType={props.type} 
                  onChildClick={(obj) => props.clickHandler(obj)}
                />
               )
            })
           }
          </div>
        </div>
        {props.type == 'To-Do' && 
          <Button 
            type={'button'} 
            onClick={() => props.addTaskHandler()} 
            label={"Add New Task"} 
          />
        }
      </div>
    </React.Fragment>
  );
};
export default Card;
