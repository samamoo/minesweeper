import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPoop, faFlag } from '@fortawesome/free-solid-svg-icons';
import './Cell.css';
library.add(faPoop,faFlag);

export default function Cell(props) {

  const cellClass = classnames("cell", {
    "cell--easy": props.level === "easy",
    "cell--med": props.level === "med",
    "cell--selected": props.selected,
    "cell--flagged": props.flagged,
    "cell--bomb":  props.value === "bomb" && props.gameOver,
  });


  return(
    // If the level is med, leave it
    // If the level is easy, change cell size
    <div className={cellClass} selected={props.selected} flagged={props.flagged} 
    onClick={() => props.selectCell(props)}
    onContextMenu={(e)=> props.flagCell(e, props)}>
      { props.value === "bomb" && 
      props.gameOver && 
      <FontAwesomeIcon size="lg" icon={faPoop}/>
      }
      {props.flagged && 
      !props.gameOver &&
      <FontAwesomeIcon size="lg" icon={faFlag}/>
      }
      {props.selected && 
      props.value !== "bomb" && 
      props.value !== 0 &&
      <p>{props.value}</p>}
    </div>
  )
}