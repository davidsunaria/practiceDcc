import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Input from "tt-frontend-components/Input/Input.tsx";
import Button from "tt-frontend-components/Button/Button.tsx";
import Card from "tt-frontend-components/Card/Card.tsx";
import {TASK_PRICE} from "tt-frontend-constants";
import { useStoreActions } from 'easy-peasy';
import {clearUserData} from 'tt-frontend-utils/Service'

interface RouteProps {
  history: any;
}

const Board: React.FC<RouteProps> = ({ history }): JSX.Element => {
  const task                                    = {id: "", cardNumber: "", cardDescription:"New Task - ", type: "todo", time: 0, price : "", timeStarted: ""};
  const [maxId, setMaxID]                       = useState<number>(151);
  const [toDoBoard, setToDoBoard]               = useState<any>([{id: "task-151", cardNumber: "TK-151", cardDescription:"Create a test TO DO app", type: "todo", time: 0, price : "", timeStarted: ""}]);
  const [inProgressBoard, setInProgressBoard]   = useState<any>([]);
  const [completeBoard, setCompleteBoard]       = useState<any>([]);

  const formatMilliseconds = (t) => {
    let sign = 1; // 1 for positive and 0 for negative
    if (t < 0) {
        t = -t;
        sign = 0;
    }
    const pad = function(n){ return n < 10 ? '0' + n : n; };
    var s,m,d,h;
    s = Math.floor(t / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;

    if( m === 60 ){
        h++;
        m = 0;
    }
    //const result = [pad(h), pad(m), pad(s)].join(':');
    return s;
  }  

  let ticketBtnClickHandler = (data) => {
    let eventType = data.type
    let localData = data;
    let toDoState       = JSON.parse(JSON.stringify(toDoBoard));
    let inProgressState = JSON.parse(JSON.stringify(inProgressBoard));
    let completeBoardState = JSON.parse(JSON.stringify(completeBoard));

    if (eventType === "todo") {
      let index = toDoState.findIndex(e => e.id == data.id);
      if(index > -1) {
        let date = new Date();
        toDoState.splice(index, 1);
        setToDoBoard(toDoState);
        localData.type = 'inprogress';
        localData.timeStarted = date.getTime();
        inProgressState.push(localData);

        setInProgressBoard(inProgressState);
      }
    } else {
      let index = inProgressState.findIndex(e => e.id == data.id);
      if(index > -1) {
        inProgressState.splice(index, 1);
        inProgressState.map((obj, idx) => {
          obj.time = formatMilliseconds(new Date().getTime() - obj.timeStarted);
        })
        setInProgressBoard(inProgressState);
        localData.price = Math.round((localData.time / 3600)  * TASK_PRICE * 100 ) / 100;
        localData.type = 'complete';
        completeBoardState.push(localData);

        setCompleteBoard(completeBoardState);
      }
    }
  }

  const addTaskHandler = () => {
    let newTask = JSON.parse(JSON.stringify(task));
    let id = maxId + 1
    newTask.id = "task- "+ id;
    newTask.cardNumber = "TK-" + id;
    newTask.cardDescription = newTask.cardDescription + id;
    toDoBoard.push(newTask);
    setToDoBoard(toDoBoard);
    setMaxID(id);
  }

  return (
    <React.Fragment>
      <div className="container-fluid pt-3">
        <h3 className="font-weight-light text-white">Kanban Board

          <span className="text-right floatRight">
            <button type="button" onClick={clearUserData} className="btn btn-primary btn-sm text-right">
              Log out
            </button>
          </span>
        </h3>


        <div className="row flex-row flex-sm-nowrap py-3">
          <div className="col-sm-4 col-md-4 col-xl-4">
            <Card type="To-Do" clickHandler={(data) => ticketBtnClickHandler(data)} data={toDoBoard} addTaskHandler={() => {addTaskHandler()}}/>
          </div>
          <div className="col-sm-4 col-md-4 col-xl-4">
            <Card type="In-Progress" clickHandler={(data) => ticketBtnClickHandler(data)} data={inProgressBoard}/>
          </div>
          <div className="col-sm-4 col-md-4 col-xl-4">
            <Card type="Done" data={completeBoard}/>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Board;
