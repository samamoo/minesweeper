import React from 'react';
import './Cell.css';

export default function Cell(props) {
  return(
    <div className="cell">
      <p>{props.value}</p>
    </div>
  )
}