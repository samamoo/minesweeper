import React from 'react';
import './LevelSelector.css';

export default function LevelSelector(props) {
  return(
    <div>
      <form>
          <select name="level" id="level" onChange={(e) => props.selectLevel(e)} defaultValue="med">
            <option value="easy">Easy</option>
            <option value="med">Medium</option>
          </select>
        </form>
    </div>
  )
}