import React from 'react';
import classnames from 'classnames';
import './Cell.css';

export default function Cell(props) {

  const cellClass = classnames("cell", {
    "cell--selected": props.selected,
    "cell--flagged": props.flagged,
  });


  return(
    <div className={cellClass} selected={props.selected} flagged={props.flagged} 
    onClick={() => props.selectCell(props)}
    onContextMenu={(e)=> props.flagCell(e, props)}>
      <p>{props.value}</p>
    </div>
  )
}