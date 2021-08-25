import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPoop, faFlag } from '@fortawesome/free-solid-svg-icons';
import './Cell.css';
library.add(faPoop,faFlag);

export default function Cell(props) {

  const cellClass = classnames("cell", {
    "cell--selected": props.selected,
    "cell--flagged": props.flagged,
    "cell--bomb":  props.value === "bomb" && props.gameOver,
  });


  return(
    <div className={cellClass} selected={props.selected} flagged={props.flagged} 
    onClick={() => props.selectCell(props)}
    onContextMenu={(e)=> props.flagCell(e, props)}>
      { props.value === "bomb" && props.gameOver && 
      <FontAwesomeIcon size="lg" icon={faPoop}/>
      }
      {props.flagged && !props.gameOver &&
      <FontAwesomeIcon size="lg" icon={faFlag}/>
      }
      {props.selected && props.value !== "bomb" && <p>{props.value}</p>}
    </div>
  )
}