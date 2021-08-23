import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import './BombCounter.css';
library.add(faFlag); 

export default function BombCounter(props) {
  return(
    <div className="counter">
      <FontAwesomeIcon className="faFlag" size="md" icon={faFlag}/>
        <p><strong>{props.bombCount}</strong></p>
    </div>
  )
}