import Board from './Board/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPoop, faBroom} from '@fortawesome/free-solid-svg-icons';
import './App.css';
library.add(faPoop, faBroom);

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>WELCOME TO TURDSWEEPER</h1>
        <h2>DON'T STEP IN THE DOO-DOO!</h2>
      </header>
      <div className="app-icons">
        <FontAwesomeIcon className="poop-icon" size="4x" icon={faPoop}/>
        <FontAwesomeIcon className="broom-icon" size="4x" icon={faBroom}/>
      </div>
      <Board/>
      {/* <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
    </div>
  );
}

export default App;
