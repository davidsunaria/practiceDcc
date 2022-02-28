import React, { useState, useEffect, createRef } from 'react';

const CardBody = (props) => {
  const [timer, setTimer] = useState(props.bodyObj.time)
  const countRef = createRef(props.bodyObj.id)

  useEffect(() => {
    if(props.parentType && props.parentType === 'In-Progress' ) {
      handleStart();
    }
  }, [])

  useEffect(() => {
    if(props.parentType && props.parentType === 'In-Progress' ) {
      if(props.bodyObj.time != 0)
        setTimer(props.bodyObj.time);
    }
  }, [props.bodyObj])

  const handleStart = () => {
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }


  const handleReset = () => {
    clearInterval(countRef.current)
    setTimer(props.bodyObj.time);
  }

  const handleAction = (obj, type) => {
    if(type === 'In-Progress' ) {
      obj.time = timer;
      handleReset();
      props.onChildClick(obj)
    } else {
      props.onChildClick(obj)
    }
  }

  const formatTime = (timer) => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }
  return (
    <React.Fragment>
      <div className="card draggable shadow-sm" >
        <div className="card-body p-2">
          <div className="card-title">
            <img src="//placehold.it/30" className="rounded-circle float-right" />
            <a className="lead font-weight-light">{props.bodyObj.cardNumber}</a>
            {props.bodyObj.type === 'inprogress' && <p>{formatTime(timer)}</p> }
            {props.bodyObj.type === 'complete' && <p>${`${props.bodyObj.price}`}</p> }
          </div>
          <p>
            {props.bodyObj.cardDescription}
          </p>
          {(props.bodyObj.type !== 'complete') &&
            <button
              onClick={() => handleAction(props.bodyObj, props.parentType)}
              className="btn btn-primary btn-sm">{(props.bodyObj.type === 'todo') ? 'Start' : (props.bodyObj.type === 'inprogress') ? 'Resolve' : ''}
            </button>
          }
        </div>
      </div>

    </React.Fragment>
  );
};
export default CardBody;
