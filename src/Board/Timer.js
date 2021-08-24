import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import './Timer.css';
library.add(faClock); 

export default function Timer(props) {
  return(
    <div className="timer">
      <FontAwesomeIcon className="faClock" size="1x" icon={faClock}/>
      <p><strong>{props.time}</strong></p>
    </div>
  )
}