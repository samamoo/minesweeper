import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import './FlagCounter.css';
library.add(faFlag); 

export default function FlagCounter(props) {
  return(
    <div className="counter">
      <FontAwesomeIcon className="faFlag" size="1x" icon={faFlag}/>
        <p><strong>{props.flagCount}</strong></p>
    </div>
  )
}